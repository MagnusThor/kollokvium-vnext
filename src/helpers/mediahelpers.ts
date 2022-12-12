
export const checkStream = (tracks: Array<MediaStreamTrack>, state:string): boolean => {
    return tracks.filter((t: MediaStreamTrack) => { return t.readyState === state; }) ? true : false;
}


export const getMediaDevices = async (): Promise<Array<MediaDeviceInfo>> => {
    return new Promise<Array<MediaDeviceInfo>>((resolve: any, reject: any) => {
        navigator.mediaDevices.enumerateDevices().then((devices: Array<MediaDeviceInfo>) => {
            resolve(devices);
        }).catch(reject);
    });
};



