import { useState, useEffect, useRef, useCallback } from 'react';
import SimplePeer from 'simple-peer';
import { Socket } from 'socket.io-client';

interface Peer {
  peerId: string;
  stream: MediaStream | null;
  connection: SimplePeer.Instance;
}

export function useWebRTC(socket: Socket | null, streamId: string) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [peers, setPeers] = useState<Map<string, Peer>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peersRef = useRef<Map<string, Peer>>(new Map());

  // Initialize local media stream
  const initLocalStream = useCallback(
    async (constraints: MediaStreamConstraints = { video: true, audio: true }) => {
      try {
        setIsConnecting(true);
        setError(null);
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        localStreamRef.current = stream;
        setLocalStream(stream);
        return stream;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to access media devices';
        setError(errorMsg);
        console.error('Media access error:', err);
        return null;
      } finally {
        setIsConnecting(false);
      }
    },
    []
  );

  // Stop local stream
  const stopLocalStream = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
      setLocalStream(null);
    }
  }, []);

  // Create peer connection
  const createPeerConnection = useCallback(
    (peerId: string, initiator: boolean) => {
      if (!socket) return null;

      const peer = new SimplePeer({
        initiator,
        stream: localStreamRef.current || undefined,
        config: {
          iceServers: [
            { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] },
          ],
        },
        trickle: true,
      });

      peer.on('signal', (data) => {
        if (initiator) {
          socket.emit('webrtc:offer', { streamId, toPeerId: peerId, offer: data });
        } else {
          socket.emit('webrtc:answer', { streamId, toPeerId: peerId, answer: data });
        }
      });

      peer.on('stream', (stream: MediaStream) => {
        setRemoteStream(stream);
      });

      peer.on('error', (err: Error) => {
        console.error(`Peer error with ${peerId}:`, err);
        setError(`Connection error: ${err.message}`);
      });

      peer.on('close', () => {
        peersRef.current.delete(peerId);
        setPeers(new Map(peersRef.current));
      });

      const peerObj: Peer = {
        peerId,
        stream: null,
        connection: peer,
      };

      peersRef.current.set(peerId, peerObj);
      setPeers(new Map(peersRef.current));

      return peer;
    },
    [socket, streamId]
  );

  // Handle incoming offer
  const handleOffer = useCallback(
    (data: { fromPeerId: string; offer: any }) => {
      const existingPeer = peersRef.current.get(data.fromPeerId);
      if (existingPeer) {
        existingPeer.connection.signal(data.offer);
      } else {
        const peer = createPeerConnection(data.fromPeerId, false);
        if (peer) {
          peer.signal(data.offer);
        }
      }
    },
    [createPeerConnection]
  );

  // Handle incoming answer
  const handleAnswer = useCallback((data: { fromPeerId: string; answer: any }) => {
    const peer = peersRef.current.get(data.fromPeerId);
    if (peer) {
      peer.connection.signal(data.answer);
    }
  }, []);

  // Handle ICE candidate
  const handleIceCandidate = useCallback((data: { fromPeerId: string; candidate: any }) => {
    const peer = peersRef.current.get(data.fromPeerId);
    if (peer) {
      try {
        peer.connection.signal(data.candidate);
      } catch (err) {
        console.error('ICE candidate error:', err);
      }
    }
  }, []);

  // Setup socket listeners
  useEffect(() => {
    if (!socket) return;

    socket.on('webrtc:offer', handleOffer);
    socket.on('webrtc:answer', handleAnswer);
    socket.on('webrtc:ice-candidate', handleIceCandidate);

    return () => {
      socket.off('webrtc:offer', handleOffer);
      socket.off('webrtc:answer', handleAnswer);
      socket.off('webrtc:ice-candidate', handleIceCandidate);
    };
  }, [socket, handleOffer, handleAnswer, handleIceCandidate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopLocalStream();
      peersRef.current.forEach(({ connection }) => {
        connection.destroy();
      });
      peersRef.current.clear();
    };
  }, [stopLocalStream]);

  return {
    localStream,
    remoteStream,
    peers: new Map(peersRef.current),
    error,
    isConnecting,
    initLocalStream,
    stopLocalStream,
    createPeerConnection,
  };
}
