import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ChatDotsFill, HandIndexThumbFill } from 'react-bootstrap-icons';
import MugshotSelector from '../Editor/Mugshot/MugshotSelector';
import DialogEditor from '../Editor/Dialog/DialogEditor';
import TextEffectDropdown from '../Editor/Dialog/TextEffectDropdown';
import DialogViewer from '../Editor/Dialog/DialogViewer';

function EventInteractor() {

    const [event, setEvent] = useState(null)

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

    function fetch_event_data(id) {
        axios.get(`http://localhost:8080/event/${id}`)
            .then(res => {
                console.log(event);
                // preprocess_incoming_project_data(res.data);
                setEvent(res.data);
                console.log(res.data);
            })
        // .catch(err => {
        //     console.error(err);
        //     setError('Failed to fetch project');
        // })
        // .finally();
    }

    const bgRatioW = 960, bgRatioH = 536;
    const bgRatio = (bgRatioW / bgRatioH).toFixed(2);
    const screenHeight = `100vh * 0.9 `;
    const screenWidth = `(${screenHeight} / ${bgRatioH}) * 0.9 * ${bgRatioW}`;

    return (
        <>
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
                        .map((character, i) => (
                            <div key={character.id + "_" + i} className={"char-cell"}>
                                <div className="char_options">
                                    <div className="char_option talk-ballon"> <ChatDotsFill size={32} color='white' /> Talk </div>
                                    <div className="char_option action-ballon"> <HandIndexThumbFill size={32} color='white' /> Interact </div>
                                </div>
                                <img key={character.EventCharacter.EventId} src={character.image} alt="Character" style={{ width: `calc(${screenWidth} * 0.9 / 3)` }} />
                            </div>
                        ))}
                </div>

                <div className="d-flex flex-column justify-content-start align-items-start ms-2 px-2" style={{ width: `calc(${screenWidth} * 0.97)`, position: "absolute", bottom: "0px", left: "0.5%", }}>
                    <div className="speaker vn-window">
                        {/* <MugshotViewer character={event?.mugshot} /> */}
                    </div>
                    {event && <DialogViewer dialog={event.dialogText}
                        hasNextDialogArrow={event.nextEvents && event.nextEvents.length > 0}
                        onclick={() => {
                            // Go to the next event url
                            if (event.nextEvents) {
                                const currentUrl = new URL(window.location.href);
                                //override only the event id in the url
                                currentUrl.searchParams.set('event', event.nextEvents[0].id);
                                window.location.href = currentUrl.href;
                                // window.location.href = `/play-scene?project=${project.id}&scene=${scene.id}&event=${event.nextEvents[0].id}`;
                            }
                        }}
                    />
                    }
                </div>
            </div>


        </>
    )
}

export default EventInteractor