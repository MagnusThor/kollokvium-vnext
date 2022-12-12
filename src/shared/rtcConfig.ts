export const rtcConfig = {
    "sdpSemantics": 'plan-b',
    "iceTransports": 'all',
    "rtcpMuxPolicy": "require",
    "bundlePolicy": "max-bundle",
    "iceServers": [
        {
            "urls": "stun:stun.l.google.com:19302"
        }
    ]
};