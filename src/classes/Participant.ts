import { IParticipant } from '../interfaces/IParticipant';



export class Participant implements IParticipant {

    mediastreams: Array<MediaStream>;
     
    constructor(public id: string, public nickName: string) {

        this.mediastreams = new Array<MediaStream>();
    }
    createMediaStream(track: MediaStreamTrack): void {
        this.mediastreams?.push(new MediaStream([track]));
    }
}
