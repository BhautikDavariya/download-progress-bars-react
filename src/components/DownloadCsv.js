import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Dropdown, ProgressBar } from 'react-bootstrap';
import Papa from 'papaparse';
import 'bootstrap';

const DownloadCsv = () => {

    const [showDropdown, setShowDropdown] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleMouseEnter = () => {
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        setShowDropdown(false);
    };

    const downloadCSV = (item) => {
        setDownloading(true); // Start downloading
        setProgress(0); // Reset progress
        const data = [
            [
                "Asset",
                "2010 - Access to electricity, rural (% of rural population)"
            ],
            [
                "Asset1",
                "2010 - Access to electricity, rural (% of rural population)"
            ],
            [
                "Asset2",
                "2010 - Access to electricity, rural (% of rural population)"
            ]
        ];

        // Convert data to CSV format
        const csv = Papa.unparse(data);

        // Create a data URI
        const csvData = new Blob([csv], { type: 'text/csv' });
        const csvURL = window.URL.createObjectURL(csvData);

        // Simulate progress with a timeout
        const interval = setInterval(() => {
            setProgress((prevProgress) => (prevProgress < 90 ? prevProgress + 10 : prevProgress));
        }, 500);

        // optional  setTimeout is not require
        setTimeout(() => {
            // Create a download link
            const a = document.createElement('a');
            a.href = csvURL;
            a.download = 'data.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);


            clearInterval(interval);
            setDownloading(false); // Finish downloading
            setProgress(100); // Set progress to 100%
        }, 1500)


    };


    return (
        <div className='col-12 col-xl-12'>
            <div className='row'>
                <div className='col-12 mt-4 pt-3  overflow-hidden'>
                    <div className='ps-1 d-flex justify-content-between align-items-center position-relative'>
                        <div className='table_download' onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}>
                            {downloading && (
                                <div className="progress-container">
                                    <ProgressBar animated now={progress} label={`${progress}%`} />
                                </div>
                            )}
                            <Dropdown show={showDropdown}>
                                <Dropdown.Toggle className='dropdown' id="dropdown-basic">
                                    <button class="btn btn-info py-1 px-2" type="button" disabled={downloading}>
                                        Download
                                    </button>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='shadow-sm'>
                                    <Dropdown.Item onClick={() => downloadCSV()}><div className='d-flex justify-content-between'><span>CSV</span> <span><FontAwesomeIcon icon={faDownload} size='lg' /></span></div></Dropdown.Item>
                                    {/* <Dropdown.Item onClick={() => handleDownloadClick('pdf')}>pdf</Dropdown.Item> */}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        {/* <FontAwesomeIcon data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Chart" className='text-danger' icon={faXmark} style={{ cursor: 'pointer' }} onClick={() => null} /> */}
                    </div>
                    <div className='w-100 m-auto chart_main justify-content-center reportDataTable overflow-auto '>
                        <h2 style={{ width: 'fit-content' }}>Horizontal Headings:</h2>
                        <table className='w-100 border text-center'>
                            <tr>
                                <th className='border'>Asset</th>
                                <th className='border'>Asset1</th>
                                <th className='border'>Asset2</th>
                            </tr>
                            <tr>
                                <td className='border'>2010 - Access to electricity, rural (% of rural population)</td>
                                <td className='border'>2010 - Access to electricity, rural (% of rural population)</td>
                                <td className='border'>2010 - Access to electricity, rural (% of rural population)</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DownloadCsv;



