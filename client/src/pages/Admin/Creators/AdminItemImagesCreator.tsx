import React, {useReducer, useState} from 'react';
import {FaPlus} from "react-icons/fa";
import {fileToUri} from "../../../utils/fileToUri";
import classes from '../../../styles/pages/creators/AdminItemImagesCreator.module.scss'
import UIButton from "../../../UIKit/UIButton";
const AdminItemImagesCreator = ({get, set, uri, setUri}:
                                    {get: FileList | null, set: (i: FileList | null) => void, uri: any[], setUri: (i:any) => void}) => {
    const [currentDraggingImage, setCurrentDraggingImage] = useState<any>()
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const imagesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        set(e.currentTarget.files)
        if (e.currentTarget.files){
            let dataArray: any[] = []
            for (let i = 0; i < Array.from(e.currentTarget.files).length; i++){
                fileToUri(e.currentTarget.files[i]).then((d: any) => dataArray.push({id: i, uri: d}))
            }
            setUri(dataArray)
        }
        setTimeout(() => {
            forceUpdate();
        }, 50)
    }

    const dragOverHandler = (e: any) => {
        e.preventDefault()
        e.target.style.border = '1px solid #CD3319'
    }
    const dragLeaveHandler = (e: any) => e.target.style.border = '0px solid black'
    const dragEndHandler = (e: any) => e.target.style.border = '0px solid black'
    const sortImages = (a: any,b: any) => a.id > b.id ? 1 : -1
    const dropHandler = (e: any, image: any) => {
        e.preventDefault()
        setUri(uri.map(i => {
            if(i.id === image.id) {
                return {...i, id: currentDraggingImage.id}
            }
            if (i.id === currentDraggingImage.id) {
                return {...i, id: image.id}
            }
            return i
        }))
        e.target.style.border = '0px solid white'
        setTimeout(() => {
            forceUpdate();
        }, 50)
    }
    return (
        <div className={classes['AdminItemImagesCreator']}>
            <div className={classes['AdminItemImagesCreator__preview']}>
                {uri.sort(sortImages).map((i, index) =>
                    <div className={classes['AdminItemImagesCreator__preview-item']}
                        key={index}
                        style={{backgroundImage: `url(${i.uri})`}}
                        draggable={true}
                        onDragStart={() => setCurrentDraggingImage(i) }
                        onDragLeave={e => dragLeaveHandler(e)}
                        onDragEnd={e => dragEndHandler(e)}
                        onDragOver={e => dragOverHandler(e)}
                        onDrop={e => dropHandler(e, i)}
                    />
                )}
            </div>
            <input id="file-upload" type="file" multiple={true} onChange={e => imagesHandler(e)}/>
            <label htmlFor="file-upload" className="custom-file-upload">
                <UIButton type={'wide'} onClick={() => {}}>{get && get.length>0 ? 'Изменить' : 'Изображения'}</UIButton>
            </label>
        </div>
    );
};

export default AdminItemImagesCreator;