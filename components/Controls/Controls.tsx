import React from 'react';



//TODO: 
// Convert to button, 
// add functionality to change controls
// move to own file, possibly in same folder.
interface KeyControlProps {
    keyName: string
}

const KeyControl = ({keyName}: KeyControlProps) => {
    return (
        <div className='
            p-2
            rounded-md
            border
            border-gray-100
            hover:bg-gray-100
            cursor-pointer
            w-12
            m-2
        '>
            <h1 className='text-lg font-bold'>
                {keyName}
            </h1>
        </div>
        
    )

}

const ControlsDisplay = () => {
    return (
        <div className='mt-2 mb-10 flex justify-between items-start p-4'>
            <div className='w-1/4'></div>
            <div className='w-1/4'>
                <div className='flex justify-end items-center'>
                    <h1 className='w-14'>Left: </h1>
                    <KeyControl keyName='a'/>
                    <KeyControl keyName='&larr;'/>
                </div>
                <div className='flex justify-end items-center'>
                        <h1 className='w-14'>Down: </h1>
                        <KeyControl keyName='s'/>
                        <KeyControl keyName='&darr;'/>
                </div>
                <div className='flex justify-end items-center'>
                    <h1 className='w-14 p-2 m-2'>Pause: </h1>
                    <KeyControl keyName='p'/>
                </div>
            </div>
            <div className='w-1/4'>
                <div className='flex justify-start items-center'>
                    <h1 className='w-14'>Right: </h1>
                    <KeyControl keyName='d'/>
                    <KeyControl keyName='&rarr;'/>
                </div>
                <div className='flex justify-start items-center'>
                        <h1 className='w-14'>Rotate: </h1>
                        <KeyControl keyName='7'/>
                        <KeyControl keyName='9'/>
                </div>
            </div>
            <div className='w-1/4'></div>
        </div>
    )

}
export default ControlsDisplay