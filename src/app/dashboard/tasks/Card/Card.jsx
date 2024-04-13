import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { MoreHorizontal } from "react-feather";

const Card = (props) => {
    const [dropdown, setDropdown] = useState(false);

    return (
        <Draggable
            key={props.id.toString()}
            draggableId={props.id.toString()}
            index={props.index}
        >
            {(provided) => (
                <>
                    <div
                        className="custom__card bg-gray-600 rounded-lg p-1"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div className="card__text">
                            <p>{props.title}</p>
                            <MoreHorizontal
                                className="car__more"
                                onClick={() => {
                                    setDropdown(true);
                                }}
                            />
                        </div>
                        {provided.placeholder}
                    </div>
                </>
            )}
        </Draggable>
    );
};

export default Card;
