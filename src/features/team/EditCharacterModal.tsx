import React from "react";
import { 
    Character
 } from '../../util';

type EditCharacterProps = {
    char: Character;
}

export default function EditCharacterModal({char}: EditCharacterProps) {

    return(
        <div>
            <p>Modal Test</p>
        </div>
    )
}