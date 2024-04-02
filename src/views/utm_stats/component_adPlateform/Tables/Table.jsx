import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Switch,
  Typography,
} from '@mui/material';
import { BASE_URL, api_version } from '../../../authentication/config';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import Swal from 'sweetalert2';
import './table.css';

function Campaign({ selectedVerticalId, selectedDateFrom, selectedDateTo, platformValue }) {
  const [tableData, setTableData] = useState([]);
  const [tableDataAdset, setTableDataAdset] = useState([]);
  const [tableDataAds, setTableDataAds] = useState([]);
  const [error, setError] = useState(null);

  const renderTableCells = (cells) => {
    return cells.map((cell, index) => (
      <TableCell key={index} sx={{ color: 'white', textAlign: 'center' }}>
        {cell}
      </TableCell>
    ));
  };

  const formatCpl = (value) => {
    return parseFloat(value).toFixed(2);
  };

  const getToken = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      throw new Error('No token available');
    }
  };

  const fetchTableDataCampaign = async () => {
    try {
      const token = await getToken();
      const accessToken = JSON.parse(token).access_token;
      const formdata = new FormData();
      formdata.append('Hipto-Authorization', accessToken);
      const requestOptions = {
        method: 'POST',
        body: formdata,
      };
      const response = await fetch(
        `${BASE_URL}/${api_version}/report/campaigns?vertical_id=${selectedVerticalId}&from=${selectedDateFrom}&to=${selectedDateTo}&sn_id=${platformValue}`,
        requestOptions,
      );
      const data = await response.json();
      const newData = data.map((item) => ({ ...item, isDetailsOpen: false }));
      setTableData(newData);
    } catch (error) {
      handleFetchError('Erreur lors de la récupération des données des campagnes !');
    }
  };

  const fetchTableDataAdset = async (campaignId, adsAccountId) => {
    try {
      const token = await getToken();
      const accessToken = JSON.parse(token).access_token;
      const formdata = new FormData();
      formdata.append('Hipto-Authorization', accessToken);
      const requestOptions = {
        method: 'POST',
        body: formdata,
      };
      const response = await fetch(
        `${BASE_URL}/${api_version}/report/adsets?vertical_id=${selectedVerticalId}&from=${selectedDateFrom}&to=${selectedDateTo}&sn_id=${platformValue}&campaign_id=${campaignId}&ads_account_id=${adsAccountId}`,
        requestOptions,
      );
      const data = await response.json();
      const newData = data.map((item) => ({ ...item, isOpen: false }));
      setTableDataAdset(newData);
    } catch (error) {
      handleFetchError('Erreur lors de la récupération des données des adsets !');
    }
  };

  const fetchTableDataAds = async (adsetId,campaignId, adsAccountId) => {
    try {
      const token = await getToken();
      const accessToken = JSON.parse(token).access_token;
      const formdata = new FormData();
      formdata.append('Hipto-Authorization', accessToken);
      const requestOptions = {
        method: 'POST',
        body: formdata,
      };
      const response = await fetch(
        `${BASE_URL}/${api_version}/report/ads?vertical_id=${selectedVerticalId}&from=${selectedDateFrom}&to=${selectedDateTo}&sn_id=${platformValue}&adset_id=${adsetId}&campaign_id=${campaignId}&ads_account_id=${adsAccountId}`,
        requestOptions,
      );
      const data = await response.json();
      const newData = data.map((item) => ({ ...item }));
      setTableDataAds(newData);
    } catch (error) {
      handleFetchError('Erreur lors de la récupération des données des annonces !');
    }
  };

  const handleFetchError = (errorMessage) => {
    Swal.fire({
      icon: 'error',
      text: errorMessage,
      width: '30%',
      confirmButtonText: "Ok, j'ai compris!",
      confirmButtonColor: '#0095E8',
    });
  };

  const handleTableCellClick = async (campaignId, adsAccountId) => {
    fetchTableDataAdset(campaignId, adsAccountId);
  };

  const handleAdsetTableCellClick = async (adsetId,campaignId, adsAccountId) => {
    fetchTableDataAds(adsetId,campaignId, adsAccountId);
  };

  useEffect(() => {
    if (selectedVerticalId && selectedDateFrom && selectedDateTo && platformValue) {
      fetchTableDataCampaign();
    }
  }, [selectedVerticalId, selectedDateFrom, selectedDateTo, platformValue]);

  return (
    <Table sx={{ padding: '0px' }}>
      <TableHead>
        <TableRow sx={{ backgroundColor: '#D44200' }}>
          {renderTableCells([
            '',
            'NAME ACCOUNT',
            'ON/OFF',
            'ID',
            'CAMPAIGN',
            'LEAD',
            'DEPENSES',
            'CPL',
            'CTR',
            'CPM',
            'TC',
          ])}
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData.map((rowData, index) => (
          <React.Fragment key={index}>
            <TableRow className={rowData.isDetailsOpen ? 'tableRowOpen' : ''}>
              <TableCell className="tab-button">
                <IconButton
                  onClick={() => {
                    const newData = [...tableData];
                    newData[index].isDetailsOpen = !newData[index].isDetailsOpen;
                    setTableData(newData);
                    handleTableCellClick(rowData.campaign_id, rowData.ads_account_id);
                  }}
                >
                  {rowData.isDetailsOpen ? (
                    <RemoveCircleOutlinedIcon style={{ color: '#ffffff' }} />
                  ) : (
                    <AddCircleOutlinedIcon style={{ color: '#D44200' }} />
                  )}
                </IconButton>
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{rowData.ads_account_name}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                <Switch checked={rowData.status} />
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{rowData.campaign_id}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{rowData.campaign_name}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{rowData.leads}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{formatCpl(rowData.spend)} €</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                <Typography className="badge">{formatCpl(rowData.cpl)} €</Typography>
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}></TableCell>
              <TableCell sx={{ textAlign: 'center' }}></TableCell>
              <TableCell sx={{ textAlign: 'center' }}>-</TableCell>
            </TableRow>
            {rowData.isDetailsOpen && (
              <TableRow>
                <TableCell colSpan={12}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#168BC4' }}>
                        {renderTableCells([
                          '',
                          'NAME ACCOUNT',
                          'ON/OFF',
                          'ID',
                          'ADSET',
                          'LEAD',
                          'DEPENSES',
                          'CPL',
                          'CTR',
                          'CPM',
                          'TC',
                        ])}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableDataAdset.map((rowDataAdset, index) => (
                        <React.Fragment key={index}>
                          <TableRow className={rowDataAdset.isOpen ? 'tableRowOpen2' : ''}>
                            <TableCell className="tab-button">
                              <IconButton
                                onClick={() => {
                                  const newData = [...tableDataAdset];
                                  newData[index].isOpen = !newData[index].isOpen;
                                  setTableDataAdset(newData);
                                  handleAdsetTableCellClick(rowDataAdset.adset_id,rowData.campaign_id, rowData.ads_account_id);
                                }}
                              >
                                {rowDataAdset.isOpen ? (
                                  <RemoveCircleOutlinedIcon style={{ color: '#ffffff' }} />
                                ) : (
                                  <AddCircleOutlinedIcon style={{ color: '#168BC4' }} />
                                )}
                              </IconButton>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{rowData.ads_account_name}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              <Switch checked={rowDataAdset.status} />
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{rowDataAdset.adset_id}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{rowDataAdset.adset_name}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{rowDataAdset.leads}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{formatCpl(rowDataAdset.spend)} €</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              <Typography className="badge">{formatCpl(rowDataAdset.cpl)} €</Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}></TableCell>
                            <TableCell sx={{ textAlign: 'center' }}></TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>-</TableCell>
                          </TableRow>
                          {rowDataAdset.isOpen && (
                            <TableRow>
                              <TableCell colSpan={12}>
                                <Table>
                                  <TableHead>
                                    <TableRow sx={{ backgroundColor: '#E7A33D' }}>
                                      {renderTableCells([
                                        '',
                                        'NAME ACCOUNT',
                                        'ON/OFF',
                                        'ID',
                                        'AD',
                                        'LEAD',
                                        'DEPENSES',
                                        'CPL',
                                        'CTR',
                                        'CPM',
                                        'TC',
                                      ])}
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {tableDataAds.map((rowDataAds, index) => (
                                      <TableRow key={index} className={rowDataAdset.isOpen ? 'tableRowOpen3' : ''}>
                                        <TableCell className="tab-button"></TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{rowData.ads_account_name}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                          <Switch checked={rowDataAds.status} />
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{rowDataAds.ad_id}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{rowDataAds.ad_name}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{rowDataAds.leads}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{formatCpl(rowDataAds.spend)} €</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                          <Typography className="badge">{formatCpl(rowDataAds.cpl)} €</Typography>
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}></TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}></TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>-</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
}

export default Campaign;
