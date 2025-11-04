import {    useState} from "react";

interface SliderStateProps {
    aromaScore: number,
    aromaIntensity: number,
    flavourScore: number,
    afterTasteScore: number,
    acidityScore: number,
    intensityScore: number,
    bodyScore: number,
    bodyLevelScore: number,
    uniformityScore: number,
    balanceScore: number,
    cleanCupScore: number,
    sweetnessScore: number,
    overallScore: number,
    totalScore: number,
}



export default function CuppingScoring({title} : { title: string}) {
    const [state, setState] = useState<SliderStateProps>({
        aromaScore: 6,
        aromaIntensity: 6,
        flavourScore: 6,
        afterTasteScore: 6,
        acidityScore: 6,
        intensityScore: 6,
        bodyScore: 6,
        bodyLevelScore: 6,
        balanceScore: 6,
        uniformityScore: 10,
        cleanCupScore: 10,
        sweetnessScore: 10,
        overallScore: 6,
        totalScore: 60,
    })
    const handleChange = (event: React.ChangeEventHandler<HTMLInputElement>, newValue: number | number[]) => {
        const {target} = event;
        setState({
            ...state,
            [target.name]: newValue,
        })
    }
    const [value, setValue] = useState(5);
    const MAX_VALUE = 10;

    return (
        <div>
            <h2>
                {title}
            </h2>
            <p>Fragrance/Aroma</p>
            {/*TODO: add interactive coffee wheel as a quick selector for taste notes*/}
            <div className="border-1 drop-shadow-lg">
                <input
                    name="aromaValue"
                    type="range"
                    min="1"
                    max={MAX_VALUE}
                    step="1"
                    value={state.aromaScore}
                    onChange={handleChange}
                    className="w-full h-20"
                />
            </div>
            <p>Acidity</p>
            <p>Body</p>
        </div>
    )
}