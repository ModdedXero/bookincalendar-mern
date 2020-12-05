import React from "react";
import { Menu, Item, Separator, Submenu, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import "../styles/form.css";

const MENU_ID = "menu-id";

export default function Setup() {
    const { show } = useContextMenu({
        id: MENU_ID
    })

    function handleItemClick({ event, props, triggerEvent, data }) {
        console.log(event, props, triggerEvent, data);
    }

    function displayMenu(e){
        show(e);
    }

    return (
        <div className="backdrop" onContextMenu={show}>
            <Menu id={MENU_ID}>
                <Item onClick={handleItemClick}>Item 1</Item>
                <Item onClick={handleItemClick}>Item 2</Item>
                <Separator />
                <Item disabled>Disabled</Item>
                <Separator />
                <Submenu label="Foobar">
                    <Item onClick={handleItemClick}>Sub 1</Item>
                    <Item onClick={handleItemClick}>Sub 2</Item>
                </Submenu>
            </Menu>
        </div>
    )
}