import React, { useState, useEffect } from 'react';
import { data } from './data';
import { Header } from "./components/Header";
import { AudioPlayer } from './components/AudioPlayer';
import { DocumentViewer } from './components/DocumentViewer';
import { VideoPlayer } from './components/VideoPlayer';
import { ImageViewer } from './components/ImageViewer';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function App() {
  const [myFiles, setMyFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePath, setFilePath] = useState("/file-server/");
  const [showChartModal, setShowChartModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name'); // Default sorting option is 'name'


  useEffect(() => {
    // Call the sorting function whenever searchQuery or sortOption changes
    setMyFiles(sortFiles(data, sortOption, searchQuery));
  }, [searchQuery, sortOption]);
  
  const sortFiles = (data, sortOption, searchQuery) => {
    // Filter the files based on the search query
    const filteredFiles = data.filter(file =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    switch (sortOption) {
      case 'name':
        return filteredFiles.sort((a, b) => a.name.localeCompare(b.name));
      case 'type':
        return filteredFiles.sort((a, b) => a.type.localeCompare(b.type));
      case 'date':
        return filteredFiles.sort((a, b) => new Date(a.date) - new Date(b.date));
      default:
        return filteredFiles;
    }
  };
  

  const handleSearch = () => {
    // Filter the files based on the search query
    const filteredFiles = data.filter(file =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMyFiles(filteredFiles);
  };

  const handleDeleteFile = () => {
    if (selectedFile) {
      // Update the hidden property of the selected file
      const updatedFiles = myFiles.map(file => {
        if (file.id === selectedFile.id) {
          return {
            ...file,
            hidden: true
          };
        }
        return file;
      });

      setMyFiles(updatedFiles);
      setSelectedFile(null);
    }
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Files Breakdown',
      },
    },
  };

  return (
    <>
      {showChartModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <p style={{ fontWeight: "bold" }}>Files Breakdown</p>
              <button style={styles.closeButton} onClick={() => setShowChartModal(false)}>close</button>
            </div>
            <div style={styles.modalBody}>
              <Pie
                data={{
                  labels: ['Video', 'Audio', 'Document', 'Image'],
                  datasets: [
                    {
                      label: 'Files Breakdown',
                      data: [
                        myFiles.filter(file => file.type === 'video').length,
                        myFiles.filter(file => file.type === 'audio').length,
                        myFiles.filter(file => file.type === 'document').length,
                        myFiles.filter(file => file.type === 'image').length
                      ],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
              <Bar
                data={{
                  labels: ['Video', 'Audio', 'Document', 'Image'],
                  datasets: [
                    {
                      label: 'Files Breakdown',
                      data: [
                        myFiles.filter(file => file.type === 'video').length,
                        myFiles.filter(file => file.type === 'audio').length,
                        myFiles.filter(file => file.type === 'document').length,
                        myFiles.filter(file => file.type === 'image').length
                      ],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={barChartOptions}
              />
            </div>
          </div>
        </div>
      )}
      <div className="App">
        <Header />
        <div style={styles.container}>
          <div style={{ padding: 10, paddingBottom: 0 }}>
            <p style={{ fontWeight: "bold" }}>My Files</p>
            <p>{selectedFile ? selectedFile.path : filePath}</p>
          </div>
          <div style={styles.controlTools}>
            <button
              style={styles.controlButton}
              onClick={() => {
                if (selectedFile) {
                  const newFiles = myFiles.map(file => {
                    if (file.id === selectedFile.id) {
                      return {
                        ...file,
                        name: prompt("Enter new name")
                      }
                    }
                    return file
                  })
                  setMyFiles(newFiles)
                  setSelectedFile(null)
                }
              }}
            >Rename</button>
            <button
              style={styles.controlButton}
              onClick={() => {
                setShowChartModal(true)
              }}
            >Files Breakdown</button>
            <button
              style={styles.controlButton}
              onClick={() => {
                if (selectedFile) {
                  window.open(selectedFile.path, "_blank")
                }
              }}
            >Download</button>
            <button
              style={styles.controlButton}
              onClick={handleDeleteFile}
            >Delete</button>
            <div style={styles.searchContainer}>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search..."
                style={styles.searchInput}
              />
              <button
                style={styles.searchButton}
                onClick={handleSearch}
              >Search</button>
            </div>

            <select
              value={sortOption}
              onChange={e => setSortOption(e.target.value)}
              style={styles.select}
            >
              <option value="name">Sort by Name</option>
              <option value="type">Sort by Type</option>
              <option value="date">Sort by Date</option>
            </select>


          </div>
          <div style={styles.fileContainer}>
            <div style={{ width: "100%", padding: 10 }}>
              {myFiles
                .filter(file => !file.hidden)
                .map(file => {
                  if (file.path.slice(0, filePath.length) === filePath) {
                    return (
                      <div
                        style={styles.file}
                        className="files"
                        key={file.id}
                        onClick={() => {
                          if (selectedFile && selectedFile.id === file.id) {
                            setSelectedFile(null);
                            return;
                          }
                          setSelectedFile(file);
                        }}
                      >
                        <p>{file.name}</p>
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
            {selectedFile && (
              <div style={styles.fileViewer}>
                {selectedFile.type === 'video' && (
                  <VideoPlayer path={selectedFile.path} />
                )}
                {selectedFile.type === 'audio' && (
                  <AudioPlayer path={selectedFile.path} />
                )}
                {selectedFile.type === 'document' && (
                  <DocumentViewer path={selectedFile.path} />
                )}
                {selectedFile.type === 'image' && (
                  <ImageViewer path={selectedFile.path} />
                )}
                <p style={{ fontWeight: "bold", marginTop: 10 }}>{selectedFile.name}</p>
                <p>path: <span style={{ fontStyle: "italic" }}>{selectedFile.path}</span></p>
                <p>file type: <span style={{ fontStyle: "italic" }}>{selectedFile.type}</span></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    backgroundColor: '#fff',
    color: '#000',
  },
  fileContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',

  },
  file: {
    backgroundColor: '#eee',
    padding: '10px',
    marginBottom: '10px',
    cursor: 'pointer',
    width: '100%',
  },
  fileViewer: {
    padding: '10px',
    margin: '10px',
    width: '30vw',
    height: '100vh',
    cursor: 'pointer',
    borderLeft: '1px solid #000'
  },
  controlTools: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '10px',
  },
  controlButton: {
    padding: '10px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    padding: '5px',
    marginRight: '5px',
    border: '1px solid #000',
    borderRadius: '4px',
  },
  searchButton: {
    padding: '5px 10px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    backgroundColor: '#eee',
  },
  // modal
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    height: '50vh',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  modalClose: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '10px',
    cursor: 'pointer',
  },
  modalBody: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: '20px',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '10px',
  },
  closeButton: {
    padding: '5px 10px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    backgroundColor: '#eee',
  },
  
  // Add this style for the select element
  select: {
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    marginLeft: '10px',
  }
  
};
