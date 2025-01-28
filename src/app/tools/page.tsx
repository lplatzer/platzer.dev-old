import Link from "next/link";
import {navigation} from "@/app/utils/nav";


export default function Tools() {

    return (
        <div>
            <h2 className="text-2xl py-4">Coffee Tools</h2>
            <div
                className={`border-2 border-gray-200 rounded-xl grid divide-x-2 grid-cols-${navigation.coffeeTools.length}`}>
                {navigation.tools.map((tool) => (
                    <div key={tool.name} className="p-2 ">
                        <Link href={tool.href}>
                            <p className="text-xl">
                                {tool.name}
                            </p>
                            <p className="mt-1">{tool.description}</p>
                        </Link>
                    </div>

                ))}
            </div>
        </div>
    )
}