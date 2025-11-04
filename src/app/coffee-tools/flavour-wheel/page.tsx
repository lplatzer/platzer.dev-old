// import * as d3 from "d3";
import {tasteWheel} from "../../seed/taste_notes";
export default function InteractiveCuppingWheel() {
    // const Sunburst = (tasteWheel, {
    //     path,
    //     id = Array.isArray(data) ? d => d.id : null,
    //     parentId = Array.isArray(data) ? d => d.parentId : null,
    //
    // }) => {
    //     return svg.node();
    // }
    // const modifiedTasteWheel = Object.entries(tasteWheel)
    //     .map(([key, value]) => (
    //         for(let step = 0, step < Object.entries(tasteWheel).length; step++) {
    //             if(key==="parentTasteNote"){
    //                 tasteWheel[step].
    //             }
    // }))
    // console.log(tasteWheel);
    // console.log(Object.entries(tasteWheel));
    type modTasteWheel = [{
            name: string,
            children: [string],
        }]
    const modTasteWheel = [{}];
    // tasteWheel.map((category) => {
    //     Object.entries(category).map((item) => {
    //         // console.log(item);
    //         item[1].map((obj) => {
    //             if(typeof obj === "object") {
    //                 modTasteWheel.push({name: obj.name});
    //             } else {
    //                 if('parentTasteNote' in {obj}) {
    //                     for(let i = 0; i < 10; i++){
    //                         for(let j = 0; j < 10; j++){
    //                         modTasteWheel[i].children = ;
    //                         console.log(modTasteWheel[i]);
    //                     }
    //                 } else if('secondLevelParentTasteNote' in {obj}) {
    //
    //                 }
    //                 modTasteWheel.push({name: obj});
    //             }
    //             // console.log(Object.entries(obj))
    //             console.log(obj)
    //
    //         })
    //     })
    //     // console.log(category);
    //     // console.log(Object.entries(category))
    // });
    //     console.log(modTasteWheel);
    // });
    // console.log(modTasteWheel)
    return(
        <div>
            <p>interactive cupping wheel</p>
            <h2>Flavour Wheel</h2>
            {/*<Sunburst/>*/}

            <h2>Jonathan Gagne versions</h2>
        </div>
    )
}