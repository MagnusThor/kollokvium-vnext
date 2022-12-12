import { defineStore } from 'pinia'
import { ClientFactory, Controller, DataChannel, WebRTCFactory } from 'thor-io.client-vnext'

import { randomString } from '@/helpers/randomString';
import { IParticipant } from '@/interfaces/IParticipant';
import { Participant } from '../classes/Participant';
import { rtcConfig } from './rtcConfig';
import { useContext } from './useContext';
import { checkStream } from '@/helpers/mediahelpers';





export const useStreams = defineStore('thorIO',  {
    state: () => ({
        isConnected: false,
        participats:new Map<string,IParticipant>(),
        rtcClient: WebRTCFactory,
        localStreams: [] as MediaStream[],
        ClientFactory: {} as ClientFactory ,   
        dataChannels: new Map<String,DataChannel>(),
        connectionId: ""
    }),
      
    actions: {
        changeContext(context:string) {
          
            const msg ={
                context: context,
                audio: checkStream(
                  this.localStreams[0].getAudioTracks(),
                  "live"
                ),
                video: checkStream(
                  this.localStreams[0].getVideoTracks(),
                  "live"
                ),
            };
            this.ClientFactory.getController("broker").invoke("changeContext", msg);
        },

        setNickname(nickName:string) {
            this.ClientFactory.getController("broker").invoke("setNickname",`@${nickName}`)
        },
        
        async addLocalStream() {
            const ms = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
            this.localStreams.push(ms)
              
        },
        connect(): void {
            const context = useContext();

            const rtc = new ClientFactory("wss://wss.kollokvium.se/", ["broker"]);                
            this.ClientFactory = rtc;
            rtc.onOpen = (broker: Controller) => {                                       
                this.isConnected = true;



                
                const rtcClient = new WebRTCFactory(broker, rtcConfig);                    
                  this.dataChannels.set("arbitrary-dc", rtcClient.createDataChannel(
                    `arbitrary-dc`
                  ));

                  rtcClient.addLocalStream(this.localStreams[0])


                rtcClient.onContextCreated = (connction) => {
                    context.uuid = connction.context;                       
                    this.connectionId = connction.peerId;
                };

                rtcClient.onContextChanged = (connction) => {
                    context.uuid = connction.context;
                    context.hasJoinded = true;
                    rtcClient.connectContext()

                };

                rtcClient.onRemoteVideoTrack = (track, connection, event) => {


                    
                    const kindOfTrack = track.kind;
                    if (kindOfTrack === "video") {                      
                        if(!this.participats.has(connection.id)){
                            const participant = new Participant(connection.id,context.user.nickname || randomString(8));
                            this.participats.set(connection.id,participant);
                            participant.createMediaStream(track);

                            console.log(participant);

                        }else{
                           const currrentParticipant =  this.participats.get(connection.id);
                           currrentParticipant?.createMediaStream(track);
                        }
                    }
                    
                };
                

                broker.connect();
             


            },
            rtc.onError = () => {}

            rtc.onClose = () => {
                this.isConnected = false;
            }
            
           
        }
    },
})