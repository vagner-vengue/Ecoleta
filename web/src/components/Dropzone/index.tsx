import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'

import { FiUpload } from "react-icons/fi";
import "./styles.css";

interface Props {
    onFileUploaded: (file: File) => void;
}

// const DropZone = () => {
// O parâmetro ( {onFileUploaded} ) indica que só queremos a propriedade com o ponteiro da função, ao invés de (props).
const DropZone: React.FC<Props> = ( {onFileUploaded} ) => {
    const [selectedFileURL, setSelectedFileURL] = useState('');
    
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];  // Poderiam ser multiplus
    
        const fileURL = URL.createObjectURL(file);
        setSelectedFileURL(fileURL);
        onFileUploaded(file);
    }, [onFileUploaded])
  
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: 'image/*'
    })

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />
            {
                
                selectedFileURL 
                ?
                    <img src={selectedFileURL} alt="Point thumbnail" />
                :
                    isDragActive 
                    ?
                        <p>Carregar arquivo ...</p> 
                    :
                        <p>
                            <FiUpload />
                            Imagem do estabelecimento.
                        </p>
            }
        </div>
    )
}

export default DropZone;
