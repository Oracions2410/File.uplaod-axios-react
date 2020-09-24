import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

import uploadService from '../services/FileUploadService'

const UploadFiles = () => {

    const [selectedFiles, setSelectedFiles] = useState(undefined)
    const [currentFile, setCurrentFile] = useState(undefined)
    const [progress, setProgress] = useState(0)
    const [message, setMessage] = useState('')
    const [fileInfos, setFileInfos] = useState([])

    // Getting files when component is loaded first time only
    useEffect(() => {
        uploadService.getFiles().then(response => {
            console.log('GET Daaaaaaaaata->>>>', response)
            setFileInfos(response.data.files)
        })
    }, [])

    const handleSelectedFile = (e) => setSelectedFiles(e.target.files)

    // HandleSubmit GET file request
    const upload = () => {

        let currentFile = selectedFiles[0]

        setCurrentFile(currentFile)
        setProgress(0)

        console.log('------>>>>', currentFile, '<<<<<<-------')

        //Upload service
        uploadService.upload(currentFile, (event) => {
            console.log(event.loaded)
            //setProgress(Math.round((100 * event.loaded) / event.total))
            setProgress(Math.round((100 * event.loaded) / event.total));

        })
            .then((response) => {
                console.log('========>>>', response.data.message, '<-===')
                setMessage(response.data.message)
                return UploadFiles.getFiles()
            })

            .then(response => {
                setFileInfos(response.data.files)
            })

            .catch(() => {
                setProgress(0)
                setCurrentFile(undefined)
                setMessage('Could not upload file')
            })

        setSelectedFiles(undefined)
    }

    return (
        <>
            {currentFile && (
                <div className="progress">
                    <div
                        className="progress-bar progress-bar-info progress-bar-striped"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: progress + "%" }}
                    >
                        {progress}%
              </div>
                </div>
            )}

            <label className="btn btn-default">
                <input type="file" onChange={handleSelectedFile} />
            </label>

            <button
                className="btn btn-success"
                disabled={!selectedFiles}
                onClick={upload}
            >
                Upload
          </button>

            <div className="alert alert-light" role="alert">
                {message}
            </div>

            <div className="card">
                <div className="card-header">List of Files</div>
                <ul className="list-group list-group-flush">
                    {fileInfos &&
                        fileInfos.map((file, index) => (
                            <li className="list-group-item" key={index}>
                                <a href={file.url}>{file.name}</a>
                            </li>
                        ))}
                </ul>
            </div>
        </>
    )
}

export default UploadFiles