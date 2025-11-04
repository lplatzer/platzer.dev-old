import Image from "next/image";


export default function Card( { title, description, imageLink }: { title: string; description: string, imageLink: string }    ) {
    return (
        <div className="border border-gray-200 rounded-lg shadow-md">
            <Image
                src={ imageLink }
            alt="imagetitle"
            width={ 400 }
            height={ 150 }/>
            <div className="text-xl">
                {title}
            </div>
            <div className="text-semibold">
                {description}
            </div>
        </div>
    )
}