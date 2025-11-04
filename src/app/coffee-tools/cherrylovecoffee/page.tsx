import Card from "@/components/card";
import Link from "next/link";
import {cherrylovecoffee} from "@/app/utils/cherrylovecoffee";


export default function CherryLoveCoffee() {
    return(
        <div>
            <h2 className="text-2xl">
                Cherry Love Coffee
            </h2>
            <Link href="./cherrylovecoffee/temp">
                <Card title={`${cherrylovecoffee[0].juli.name} Box`} description={cherrylovecoffee[0].juli.desc} imageLink="/../../../public/luis_platzer.jpg"></Card>
            </Link>
        </div>
    )
}