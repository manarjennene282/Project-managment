import React, { useState, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import { FaFilePdf, FaTrash } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import UploadExcel from '../../components/UploadCsv';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useClientsQuery from '../../hooks/Clients/useClientsQuery';
import Add from './Add';
import { FaEdit } from 'react-icons/fa'; // Import the edit icon
import getEnv from '../../common/env/env';
import QRCode from 'qrcode'; // Add this library for generating QR codes

interface Client {
  id: number;
  appartement: string;
  proprietaire: string;
  ancienne_cotisation: string;
  unpaid_2016: string;
  unpaid_2017: string;
  unpaid_2018: string;
  unpaid_2019: string;
  unpaid_2020: string;
  unpaid_2021: string;
  impayes_mohamed: string;
  cotisation_2021_post_cloture_comptable: string | null;
  nouvelle_cotisation: string | null;
  unpaid_2022: string;
  unpaid_2023: string;
  unpaid_2024: string;
  unpaid_2025: string;
  total_impaye_2016_2025: string;
  total_paye: string; // Added this field
  remarque: string;
}

const baseurl = getEnv().baseUrl;

const ITEMS_PER_PAGE = 10;

const Admin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: allusers = [], refetch: refetchClients } = useClientsQuery();
  // console.log('allusers', allusers);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  }, []);

  const handleFileUpload = async (file: File) => {
    const reader = new FileReader();
    setLoading(true);
    setUploadProgress(0);

    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const fileContent = e.target?.result as ArrayBuffer;

      try {
        // Parse the Excel file
        const workbook = XLSX.read(fileContent, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert the worksheet to JSON
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Extract headers (first row)
        const headers = data[0] as string[];

        // Extract subheaders (second row)
        const subheaders = data[1] as string[];

        // Combine headers and subheaders to create flattened headers
        const flattenedHeaders = headers.map((header, index) => {
          if (
            header === 'ANCIENNE COTISATION' ||
            header === 'NOUVELLE COTISATION'
          ) {
            return `${header} ${subheaders[index]}`;
          }
          return header;
        });

        // Log the flattened headers for debugging
        console.log('Flattened Headers:', flattenedHeaders);

        // Normalize headers by removing newlines and trimming whitespace
        const normalizedHeaders = flattenedHeaders.map((header) =>
          header.replace(/\r\n/g, ' ').trim(),
        );

        // Log normalized headers
        console.log('Normalized Headers:', normalizedHeaders);

        // Map the normalized headers to backend fields
        const headerMap: { [key: string]: string } = {
          Appartement: 'appartement',
          Propriétaire: 'proprietaire',
          'ANCIENNE COTISATION 2016': 'unpaid_2016', // Map Column C to unpaid_2016
          'ANCIENNE COTISATION 2017': 'unpaid_2017', // Map Column D to unpaid_2017
          'ANCIENNE COTISATION 2018': 'unpaid_2018', // Map Column E to unpaid_2018
          'ANCIENNE COTISATION 2019': 'unpaid_2019', // Map Column F to unpaid_2019
          'ANCIENNE COTISATION 2020': 'unpaid_2020', // Map Column G to unpaid_2020
          'ANCIENNE COTISATION 2021': 'unpaid_2021', // Map Column H to unpaid_2021
          'COTISATION 2021 POST-CLÔTURE COMPTABLE':
            'cotisation_2021_post_cloture_comptable', // Map Column J
          'NOUVELLE COTISATION 2022': 'unpaid_2022', // Map Column K
          'NOUVELLE COTISATION 2023': 'unpaid_2023', // Map Column L
          'NOUVELLE COTISATION 2024': 'unpaid_2024', // Map Column M
          'NOUVELLE COTISATION 2025': 'unpaid_2025', // Map Column N
          'TOTAL PAYÉ 2016-2025': 'total_paye', // Map Column O
          'TOTAL IMPAYÉ 2016-2025': 'total_impaye_2016_2025', // Map Column P
          REMARQUE: 'remarque', // Map Column Q
        };

        // Log the header map
        console.log('Header Map:', headerMap);

        const formattedData = data.slice(2).map((row: any) => {
          return {
            appartement: row[0], // Column A
            proprietaire: row[1], // Column B
            unpaid_2016: row[2] || 0, // Column C (2016)
            unpaid_2017: row[3] || 0, // Column D (2017)
            unpaid_2018: row[4] || 0, // Column E (2018)
            unpaid_2019: row[5] || 0, // Column F (2019)
            unpaid_2020: row[6] || 0, // Column G (2020)
            unpaid_2021: row[7] || 0, // Column H (2021)
            impayes_mohamed: row[8] || 0, // Column I (Impayés Mohamed)
            cotisation_2021_post_cloture_comptable: row[9] || 0, // Column J (2021 Post-Clôture)
            unpaid_2022: row[10] || 0, // Column K (2022)
            unpaid_2023: row[11] || 0, // Column L (2023)
            unpaid_2024: row[12] || 0, // Column M (2024)
            unpaid_2025: row[13] || 0, // Column N (2025)
            total_paye: row[14] || 0, // Column O (Total Payé)
            total_impaye_2016_2025: row[15] || 0, // Column P (Total Impayé)
            remarque: row[16] || 'N/A', // Column Q (Remarque)
          };
        });

        // Log the formatted data for debugging
        console.log('Formatted Data:', formattedData);

        // Send all clients to the backend in a single request
        const response = await axios.post(
          `${baseurl}/side/clients/upload`,
          { clients: formattedData }, // Wrap the data in a "clients" key
          {
            headers: { 'Content-Type': 'application/json' },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total!,
              );
              setUploadProgress(progress);
            },
          },
        );

        if (response.status !== 201) {
          throw new Error('Failed to upload clients.');
        }

        toast.success('Clients uploaded successfully!');
        refetchClients(); // Refetch the clients list

        // Verify if the data is stored correctly on the backend
        try {
          const verifyResponse = await axios.get(`${baseurl}/side/all`);
          console.log('Data from backend:', verifyResponse.data);

          // Compare data for validation (optional)
          const backendData = verifyResponse.data;
          if (JSON.stringify(formattedData) === JSON.stringify(backendData)) {
            toast.success('Data verified successfully!');
          } else {
            toast.error('Data mismatch detected!');
          }
        } catch (error) {
          console.error('Error verifying data:', error);
          toast.error('Failed to verify data. Skipping verification.');
        }
      } catch (error) {
        console.error('Error parsing Excel file or uploading data:', error);
        setError('Failed to process the Excel file. Please try again.');
        toast.error('Failed to process the Excel file. Please try again.');
      } finally {
        setLoading(false);
        setUploadProgress(0);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const filteredClients = allusers.filter((client) => {
    // Skip rows where key fields are 'N/A' or empty
    if (
      client.appartement === 'N/A' &&
      client.proprietaire === 'N/A' &&
      client.ancienne_cotisation === 'N/A' &&
      client.unpaid_2016 === '0.00' &&
      client.unpaid_2017 === '0.00' &&
      client.unpaid_2018 === '0.00' &&
      client.unpaid_2019 === '0.00' &&
      client.unpaid_2020 === '0.00' &&
      client.unpaid_2021 === '0.00' &&
      client.impayes_mohamed === '0.00' &&
      client.unpaid_2022 === '0.00' &&
      client.unpaid_2023 === '0.00' &&
      client.unpaid_2024 === '0.00' &&
      client.unpaid_2025 === '0.00' &&
      client.total_impaye_2016_2025 === '0.00' &&
      client.total_paye === '0.00' && // Added this field
      client.remarque === 'N/A'
    ) {
      return false; // Exclude this row
    }

    // Include rows that match the search term
    const owner = client.proprietaire || '';
    const apartment = client.appartement || '';
    return (
      owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apartment.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentClients = filteredClients.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDelete = async (clientId: number) => {
    try {
      await axios.delete(`${baseurl}/api/side/${clientId}`);
      toast.success('Client deleted successfully!');
      refetchClients(); // Refetch the clients list
    } catch (error) {
      console.error('Error deleting client:', error);
      toast.error('Failed to delete client. Please try again.');
    }
  };

  const generateReceiptPDF = (client: Client) => {
    const doc = new jsPDF();

    // Set colors for the invoice
    const primaryColor = '#6C5CE7'; // Purple for headings and accents
    const secondaryColor = '#FF7675'; // Coral for highlights
    const backgroundColor = '#F8F9FA'; // Light gray for backgrounds
    const textColor = '#2D3436'; // Dark gray for text
    const tableHeaderColor = '#6C5CE7'; // Purple for table headers

    // Add logo to the header (Column 1)
    const logoUrl = '../../logo1.png';
    doc.addImage(logoUrl, 'PNG', 10, 10, 40, 20); // Adjust dimensions as needed

    // Add title and address (Column 2)
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor);
    doc.text('Syndic Résidence Harmony', 60, 15);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textColor);
    doc.text('Rue du Maroc Ain Zaghouen Nord, Marsa 2046', 60, 25);

    // Add receipt details (Column 3)
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textColor);
    doc.text(`Reçu N°: ${Math.floor(Math.random() * 10000000000)}`, 150, 15);
    doc.text(`Appartement: ${client.appartement}`, 150, 25);
    doc.text(`Client: ${client.proprietaire}`, 150, 35);
    doc.text(`Édité le: ${new Date().toISOString().split('T')[0]}`, 150, 45);

    // Add a horizontal line separator
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(0.5);
    doc.line(10, 50, 200, 50);

    // Add payment confirmation section
    doc.setFillColor(backgroundColor); // Light gray background
    doc.rect(10, 55, 190, 20, 'F'); // Background for payment confirmation
    doc.setTextColor(textColor);
    doc.setFontSize(10); // Smaller font size for confirmation text
    doc.text(
      `Le syndic de la Résidence Harmony confirme avoir reçu la somme de: (${
        client.total_paye
      } DT), ESPECE sous le numéro: 075450 le ${
        new Date().toISOString().split('T')[0]
      }. Cette somme correspond aux frais de syndic pour l'appartement ${
        client.appartement
      } pour la période du 01/06/2015 au 31/12/2025.`,
      15,
      60,
      { maxWidth: 180 },
    );

    // Add Cotisations Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor);
    const labelText = 'COTISATIONS'; // Uppercase label
    const labelWidth = doc.getTextWidth(labelText); // Get the width of the label
    const pageWidth = doc.internal.pageSize.getWidth(); // Get the page width
    const centerX = (pageWidth - labelWidth) / 2; // Calculate the center position
    doc.text(labelText, centerX, 90); // Center the label

    // Table headers for Cotisations
    doc.setFillColor(tableHeaderColor); // Purple background for headers
    doc.rect(10, 95, 190, 12, 'F'); // Background for headers (full width)
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#FFFFFF'); // White text for headers
    doc.text('Année', 15, 100);
    doc.text('Montant', 150, 100);

    // Combine Ancienne and Nouvelle Cotisation data
    const cotisationData = [
      { year: '2016', amount: `${client.unpaid_2016}` },
      { year: '2017', amount: `${client.unpaid_2017}` },
      { year: '2018', amount: `${client.unpaid_2018}` },
      { year: '2019', amount: `${client.unpaid_2019}` },
      { year: '2020', amount: `${client.unpaid_2020}` },
      { year: '2021', amount: `${client.unpaid_2021}` },
      { year: '2022', amount: `${client.unpaid_2022}` },
      { year: '2023', amount: `${client.unpaid_2023}` },
      { year: '2024', amount: `${client.unpaid_2024}` },
      { year: '2025', amount: `${client.unpaid_2025}` },
    ];

    // Draw the table for Cotisations
    cotisationData.forEach((detail, index) => {
      const y = 110 + index * 12; // Increased row height for better spacing
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(textColor);
      doc.text(detail.year, 15, y);
      doc.text(detail.amount, 150, y);
    });

    // Add borders for Cotisations Table
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(0.2);
    doc.rect(10, 95, 190, cotisationData.length * 12 + 5); // Border for the entire table

    // Add boxes for Total Payé and Total Impayé
    const totalsStartY = 110 + cotisationData.length * 12 + 15; // Position below the table
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(secondaryColor);
    doc.text('Total Payé', 15, totalsStartY);
    doc.text('Total Impayé', 120, totalsStartY);

    // Box for Total Payé
    doc.setFillColor(backgroundColor); // Light gray background
    doc.rect(10, totalsStartY + 5, 90, 15, 'F'); // Background for Total Payé
    doc.setTextColor(textColor);
    doc.setFontSize(10);
    doc.text(`${client.total_paye} DT`, 15, totalsStartY + 15);

    // Box for Total Impayé
    doc.setFillColor(backgroundColor); // Light gray background
    doc.rect(115, totalsStartY + 5, 90, 15, 'F'); // Background for Total Impayé
    doc.setTextColor(textColor);
    doc.setFontSize(10);
    doc.text(`${client.total_impaye_2016_2025} DT`, 120, totalsStartY + 15);

  
    // Add a horizontal line separator before the footer
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(0.5);
    doc.line(10, totalsStartY + 80, 200, totalsStartY + 80); // Move the line below the QR code

    // Save the PDF
    doc.save(`${client.proprietaire}_Reçu.pdf`);
  };
  const handleAddClient = () => {
    console.log('New client added');
    // Add logic to update the table or state
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingClient(null); // Reset editing client when closing
  };

  const openEditModal = (client: Client) => {
    setEditingClient(client); // Set the client to be edited
  };

  return (
    <div className="p-8 min-h-screen w-full">
      <ToastContainer />
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          className="p-2 border rounded-md w-1/3"
          placeholder="Rechercher des clients..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <UploadExcel onFileUpload={handleFileUpload} />
        </div>
        <div className="flex-1">
          <Add onAdd={handleAddClient} /> {/* Pass the onAdd function */}
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">Uploading File...</h2>
            <div className="w-64 h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="mt-2 text-green-600 font-medium">{uploadProgress}%</p>
          </div>
        </div>
      )}

      {error && <div className="text-red-500">{error}</div>}

      <div className="overflow-x-auto shadow-lg rounded-xl mt-6">
        <table className="w-full table-auto border-collapse bg-white">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 border" rowSpan="2">
                Appartement
              </th>
              <th className="px-4 py-2 border" rowSpan="2">
                Propriétaire
              </th>
              <th className="px-4 py-2 border" colSpan="6">
                Ancienne Cotisation
              </th>
              <th className="px-4 py-2 border" rowSpan="2">
                Cotisation 2021 Post-Clôture
              </th>
              <th className="px-4 py-2 border" colSpan="4">
                Nouvelle Cotisation
              </th>
              <th className="px-4 py-2 border" rowSpan="2">
                Total Payé 2016-2025
              </th>
              <th className="px-4 py-2 border" rowSpan="2">
                Total Impayé 2016-2025
              </th>
              <th className="px-4 py-2 border" rowSpan="2">
                Remarque
              </th>
              <th className="px-4 py-2 border" rowSpan="2">
                Actions
              </th>
            </tr>
            <tr>
              <th className="px-4 py-2 border">2016</th>
              <th className="px-4 py-2 border">2017</th>
              <th className="px-4 py-2 border">2018</th>
              <th className="px-4 py-2 border">2019</th>
              <th className="px-4 py-2 border">2020</th>
              <th className="px-4 py-2 border">2021</th>
              <th className="px-4 py-2 border">2022</th>
              <th className="px-4 py-2 border">2023</th>
              <th className="px-4 py-2 border">2024</th>
              <th className="px-4 py-2 border">2025</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.map((client) => (
              <tr
                key={client.id}
                className="text-center hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2 border text-black font-medium">
                  {client.appartement}
                </td>
                <td className="px-4 py-2 border text-black font-medium">
                  {client.proprietaire}
                </td>
                <td className="px-4 py-2 border text-black font-medium">
                  {client.unpaid_2016}
                </td>
                <td className="px-4 py-2 border text-black font-medium">
                  {client.unpaid_2017}
                </td>
                <td className="px-4 py-2 border text-black font-medium">
                  {client.unpaid_2018}
                </td>
                <td className="px-4 py-2 border text-black font-medium">
                  {client.unpaid_2019}
                </td>
                <td className="px-4 py-2 border text-black font-medium">
                  {client.unpaid_2020}
                </td>
                <td className="px-4 py-2 border text-black font-medium">
                  {client.unpaid_2021}
                </td>
                <td className="px-4 py-2 border text-black font-medium">
                  {client.cotisation_2021_post_cloture_comptable || 'N/A'}
                </td>
                <td className="px-4 py-2 border text-black font-medium">
                  {client.unpaid_2022 || 'N/A'}
                </td>
                <td className="px-4 py-2 border text-black font-medium">
                  {client.unpaid_2023 || 'N/A'}
                </td>
                <td className="px-4 py-2 border text-black font-medium">
                  {client.unpaid_2024 || 'N/A'}
                </td>
                <td className="px-4 py-2 border text-black font-medium">
                  {client.unpaid_2025 || 'N/A'}
                </td>
                <td className="px-4 py-2 border text-black font-medium">
                  {client.total_paye}
                </td>
                <td className="px-4 py-2 border text-black font-medium">
                  {client.total_impaye_2016_2025}
                </td>
                <td className="px-4 py-2 border text-black font-medium">
                  {client.remarque}
                </td>
                <td className="px-4 py-2 border flex justify-center space-x-2">
                  <button
                    onClick={() => generateReceiptPDF(client)}
                    className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                  >
                    <FaFilePdf />
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => openEditModal(client)} // Open edit modal
                    className="text-white bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 transition-colors duration-300"
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6">
        {Array.from(
          { length: Math.ceil(filteredClients.length / ITEMS_PER_PAGE) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-4 py-2 rounded ${
                currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default Admin;
