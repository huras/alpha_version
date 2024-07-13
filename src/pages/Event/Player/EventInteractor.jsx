import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ArrowDownCircleFill, ArrowLeftCircleFill, ArrowRightCircleFill, ArrowUpCircleFill, BoxArrowRight, ChatDotsFill, Cloud, HandIndexThumbFill, House, NodePlus, NodePlusFill, PlayBtn } from 'react-bootstrap-icons';
import MugshotSelector from '../Editor/Mugshot/MugshotSelector';
import DialogEditor from '../Editor/Dialog/DialogEditor';
import TextEffectDropdown from '../Editor/Dialog/TextEffectDropdown';
import DialogViewer from '../Editor/Dialog/DialogViewer';
import MugshotViewer from '../Editor/Mugshot/MugshotViewer';
import { Button, Card } from 'react-bootstrap';
import DBAPI from '../../../services/db';

function EventInteractor() {

    const [event, setEvent] = useState(null)
    const [isProcessingAction, setIsProcessingAction] = useState(false)

    // Fetch the event by the url "/play-scene?project=${project.id}&scene=${scene.id}&event=${event.id}"
    useEffect(() => {

        var idToUse = undefined;
        if (!event) {
            const urlParams = new URLSearchParams(window.location.search);
            idToUse = urlParams.get('event');
        } else {
            idToUse = event.id;
        }
        if (!idToUse) return;

        fetch_event_data(idToUse);
    }, []);

    function goToEventID(event_id) {
        history.pushState({ event: "event" }, "", "page2.html");
    }

    function fetch_event_data(id) {
        setIsProcessingAction(true);
        DBAPI.get(`/event/${id}`)
            .then(res => {
                setIsProcessingAction(false);
                console.log(event);
                // preprocess_incoming_project_data(res.data);
                setEvent(res.data);
                console.log(res.data);
            })
    }

    function let_AI_play_out() {
        setIsProcessingAction(true);
        DBAPI.get(`/event/${id}`)
            .then(res => {
                setIsProcessingAction(false);
                console.log(event);
                // preprocess_incoming_project_data(res.data);
                setEvent(res.data);
                console.log(res.data);
            })
    }

    function clickTalk(character){
        setIsProcessingAction(true);
        const text = prompt("What do you want to say?");
        if (text) {
            
            DBAPI.post(`/event/talkWithCharacter`, {text, char_id: character.id, leaf_event_id: event.id})
            .then(res => {
                setIsProcessingAction(false);
                console.log(res.data);
                // console.log(event);
                // preprocess_incoming_project_data(res.data);
                // setEvent(res.data.updated_event);
                const currentUrl = new URL(window.location.href);                
                currentUrl.searchParams.set('event', res.data.updated_event.nextEvents[0].id);
                window.location.href = currentUrl.href;

                
            })
        }
    }
    
    function thinkSomething(){
        setIsProcessingAction(true);
        const text = prompt("What do you want to think as the protagonist?");
        if (text) {
            
            DBAPI.post(`/event/protagonistThinkSomething`, {text, leaf_event_id: event.id})
            .then(res => {
                setIsProcessingAction(false);
                console.log(res.data);
                // console.log(event);
                // preprocess_incoming_project_data(res.data);
                // setEvent(res.data.updated_event);
                const currentUrl = new URL(window.location.href);                
                currentUrl.searchParams.set('event', res.data.updated_event.nextEvents[0].id);
                window.location.href = currentUrl.href;

                
            })
        }
    }

    function clickContinueEvent(){
        setIsProcessingAction(true);
        DBAPI.post(`/event/continueEvent`, {leaf_event_id: event.id})
            .then(res => {
                console.log(res.data);
                // console.log(event);
                // preprocess_incoming_project_data(res.data);
                // setEvent(res.data.updated_event);
                const currentUrl = new URL(window.location.href);                
                currentUrl.searchParams.set('event', res.data.updated_event.nextEvents[0].id);
                const next_event_id = res.data.updated_event.nextEvents[0].id;
                DBAPI.get(`/event/${next_event_id}`)
                    .then(res => {
                        setIsProcessingAction(false);
                        console.log(event);
                        // preprocess_incoming_project_data(res.data);
                        setEvent(res.data);
                        console.log(res.data);
                    })
            })

    }

    const bgRatioW = 960, bgRatioH = 536;
    const bgRatio = (bgRatioW / bgRatioH).toFixed(2);
    const screenHeight = `100vh * 0.9 `;
    const screenWidth = `(${screenHeight} / ${bgRatioH}) * 0.9 * ${bgRatioW}`;

    return (
        <div className="container-fluid play_frame">
            <div
                className="playing"
                style={{
                    backgroundImage: `url('${!event?.event_backgrounds?.length ? '' : event?.event_backgrounds[0].image}')`,
                    width: `calc(${screenWidth})`,
                    height: `calc(${screenHeight})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',

                    position: "relative",
                }}>
                <div className="character-pivot">
                    {event?.event_characters && event?.event_characters
                        .sort((a, b) => a.EventCharacter.order - b.EventCharacter.order)
                        .filter((character) => !character.is_protagonist)
                        .map((character, i) => (
                            <div key={character.id + "_" + i} className={"char-cell"}>
                                <div className="char_options">
                                    <div className='char_option char_name'> {character.fullname} </div>
                                    <div className="char_option talk-ballon" onClick={() => {clickTalk(character)}}> <ChatDotsFill size={32} color='white' /> Talk </div>
                                    {/* <div className="char_option action-ballon"> <HandIndexThumbFill size={32} color='white' /> Interact </div> */}
                                    <div className="char_option action-ballon"> <BoxArrowRight size={32} color='white' /> Good Bye </div>
                                </div>
                                <img key={character.EventCharacter.EventId} src={character.image} alt="Character" style={{ width: `calc(${screenWidth} * 0.9 / 3)` }} />
                            </div>
                        ))}
                </div>

                <div className="d-flex flex-column justify-content-start align-items-start ms-2 px-2" style={{ width: `calc(${screenWidth} * 0.97)`, position: "absolute", bottom: "1%", left: "0.5%", }}>
                    { event?.mugshot && <div className="speaker vn-window vn-w-dark d-flex flex-column justify-content-center align-items-center">
                        <MugshotViewer character={event?.mugshot} />
                        {event?.speaker && <div className="speaker-name">{event?.speaker.fullname}</div>}
                    </div>}
                    {event && <DialogViewer dialog={event.dialogText}
                        hasNextDialogArrow={event.nextEvents && event.nextEvents.length > 0}
                        onclick={() => {
                            // Go to the next event url
                            if (event.nextEvents && event.nextEvents.length > 0) {

                                setIsProcessingAction(true);
                                DBAPI.get(`/event/${event.nextEvents[0].id}`)
                                    .then(res => {
                                        setIsProcessingAction(false);
                                        console.log(event);
                                        // preprocess_incoming_project_data(res.data);
                                        setEvent(res.data);
                                        console.log(res.data);
                                    })

                                const currentUrl = new URL(window.location.href);
                                //override only the event id in the url
                                currentUrl.searchParams.set('event', event.nextEvents[0].id);
                                // window.location.href = currentUrl.href;
                                // window.location.href = `/play-scene?project=${project.id}&scene=${scene.id}&event=${event.nextEvents[0].id}`;
                            }
                        }}
                    />
                    }
                </div>
            </div>
            
            <div className="container" style={{visibility: isProcessingAction ? 'hidden' : 'visible'}}>
                <Card style={{ padding: '2px', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }} className="page-controller d-flex" >
                    <Card.Body className="w-100" style={{ display: "flex", padding: '2px', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Button 
                            title="Go to the previous event"
                            className="me-2"
                            variant= {(event && event.parentEvent) ? 'primary' : 'secondary'} 
                            onClick={() => {
                                if (event && event.parentEvent) {
                                    const currentUrl = new URL(window.location.href);
                                    
                                    //override only the event id in the url
                                    currentUrl.searchParams.set('event', event.parentEvent);

                                    setIsProcessingAction(true);
                                    DBAPI.get(`/event/${event.parentEvent}`)
                                        .then(res => {
                                            setIsProcessingAction(false);
                                            console.log(event);
                                            // preprocess_incoming_project_data(res.data);
                                            setEvent(res.data);
                                            console.log(res.data);
                                        })
                                }
                            }}>
                            <div>Back</div>
                            <ArrowUpCircleFill size={32} color='white'/>
                        </Button>

                        <Button 
                            title="Go to the next event"
                            className="me-2"
                            variant= {(event && event.nextEvents && event.nextEvents.length > 0) ? 'primary' : 'secondary'} 
                            onClick={() => {
                                if (event && event.nextEvents && event.nextEvents.length > 0) {
                                    const currentUrl = new URL(window.location.href);
                                    
                                    //override only the event id in the url
                                    currentUrl.searchParams.set('event', event.nextEvents[0].id);

                                    setIsProcessingAction(true);
                                    DBAPI.get(`/event/${event.nextEvents[0].id}`)
                                        .then(res => {
                                            setIsProcessingAction(false);
                                            console.log(event);
                                            // preprocess_incoming_project_data(res.data);
                                            setEvent(res.data);
                                            console.log(res.data);
                                        })
                                }
                            }}>
                            <div>Next</div>
                            <ArrowDownCircleFill size={32} color='white'/>
                        </Button>

                        {(event && event.nextEvents.length === 0) && <div className="mx-5">
                            <div>Alternate Versions</div>
                            <div>
                                <Button variant={(event && event.event_brothers && event.event_brothers.length > 1) ? 'primary' : 'secondary'}>
                                    <ArrowLeftCircleFill size={32} color='white' onClick={() => {
                                        if (event && event.event_brothers && event.event_brothers.length > 1) {
                                            const currentUrl = new URL(window.location.href);
                                            //override only the event id in the url
                                            currentUrl.searchParams.set('event', event.event_brothers[(event.event_brothers.findIndex(ev => ev.id === event.id) - 1 + event.event_brothers.length) % event.event_brothers.length].id);
                                            window.location.href = currentUrl.href;
                                        }
                                    }}/>
                                </Button>
                                { (event && event.event_brothers && event.event_brothers.length > 1) ? `${event.event_brothers.findIndex(ev => ev.id === event.id) + 1}/${event.event_brothers.length}` : '-/-'}
                                <Button variant={(event && event.event_brothers && event.event_brothers.length > 1) ? 'primary' : 'secondary'}>
                                    <ArrowRightCircleFill size={32} color='white' onClick={() => {
                                        if (event && event.event_brothers && event.event_brothers.length > 1) {
                                            const currentUrl = new URL(window.location.href);
                                            //override only the event id in the url
                                            currentUrl.searchParams.set('event', event.event_brothers[(event.event_brothers.findIndex(ev => ev.id === event.id) + 1) % event.event_brothers.length].id);
                                            window.location.href = currentUrl.href;
                                        }
                                    }}/>
                                </Button>
                            </div>
                        </div>}

                        <div className="mx-5">
                            <Button 
                                title="Let it play out"
                                className="me-2"
                                variant= {(event) ? 'primary' : 'secondary'} 
                                onClick={() => {
                                    clickContinueEvent();
                                }}>
                                <div> AI continue...</div>
                                <PlayBtn size={32} color='white'/>
                            </Button>

                            <Button 
                                title="Think something"
                                className="me-2"
                                variant= {(!isProcessingAction) ? 'primary' : 'secondary'} 
                                onClick={() => {
                                    thinkSomething();
                                }}>
                                <div> Think something</div>
                                <Cloud size={32} color='white'/>
                            </Button>                        

                            <Button 
                                variant='primary' 
                                title="Spawn new Scene"
                                className="me-2"
                                onClick={() => { 
                                    // Go to url /contiue-scene?origin-scene=2
                                    const currentUrl = new URL(window.location.href);
                                    const sceneId = currentUrl.searchParams.get('scene');
                                    window.location.href = `http://localhost:8000/continue-scene?origin-scene=${sceneId}`;
                                }}
                            >
                                <div>New Next Scene</div>
                                <NodePlusFill size={32} color='white'/>
                            </Button>
                        </div>

                        {/* A button to go to the scene page url at /scene?scene=3&project=2 instead of /play-scene?project=2&scene=3&event=1 */}
                        <Button variant='primary' 
                            className="mx-5"
                            title="Go to the scene page"
                            onClick={() => {
                                const currentUrl = new URL(window.location.href);
                                const sceneId = currentUrl.searchParams.get('scene');
                                const projectId = currentUrl.searchParams.get('project');
                                window.location.href = `http://localhost:8000/scene?scene=${sceneId}&project=${projectId}`;
                            }
                        }>
                            <div>Scene</div>
                            <House size={32} color='white'/>
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default EventInteractor