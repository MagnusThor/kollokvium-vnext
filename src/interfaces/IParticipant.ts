export interface IParticipant {
    id: string
    mediastreams: Array<MediaStream> | undefined
    createMediaStream(track:MediaStreamTrack):void
    nickName:string
}
