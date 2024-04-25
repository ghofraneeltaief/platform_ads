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
  CircularProgress,
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
  const [tableDataKeyword, setTableDataKeyword] = useState([]);
  const [isLoadingCamp, setIsLoadingCamp] = useState(false);
  const [isLoadingAdset, setIsLoadingAdset] = useState(false);
  const [isLoadingAds, setIsLoadingAds] = useState(false);
  const [isLoadingKeyword, setIsLoadingKeyword] = useState(false);
  const [campaignAdsetData, setCampaignAdsetData] = useState({});

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

  const fetchTableData = async (endpoint, setStateFunction) => {
    try {
      const token = await getToken();
      const accessToken = JSON.parse(token).access_token;
      const formdata = new FormData();
      formdata.append('Hipto-Authorization', accessToken);
      const requestOptions = {
        method: 'POST',
        body: formdata,
      };
      const response = await fetch(endpoint, requestOptions);
      const data = await response.json();
      setStateFunction(data.map((item) => ({ ...item })));
    } catch (error) {
      handleFetchError('Erreur lors de la récupération des données !');
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
    setIsLoadingAdset(true);
    const adsetData = await fetchAdsetData(campaignId, adsAccountId);
    setCampaignAdsetData({ ...campaignAdsetData, [campaignId]: adsetData });
    setTableDataAdset(adsetData);
    setIsLoadingAdset(false);
  };

  const fetchAdsetData = async (campaignId, adsAccountId) => {
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
      return data.map((item) => ({ ...item }));
    } catch (error) {
      handleFetchError("Erreur lors de la récupération des données d'adset !");
      return [];
    }
  };
  const handleAdsetTableCellClick = async (adsetId, campaignId, adsAccountId) => {
    setIsLoadingAds(true);
    fetchTableData(
      `${BASE_URL}/${api_version}/report/ads?vertical_id=${selectedVerticalId}&from=${selectedDateFrom}&to=${selectedDateTo}&sn_id=${platformValue}&adset_id=${adsetId}&campaign_id=${campaignId}&ads_account_id=${adsAccountId}`,
      setTableDataAds,
    ).finally(() => setIsLoadingAds(false));
    setIsLoadingKeyword(true);
    fetchTableData(
      `${BASE_URL}/${api_version}/report/keywords?vertical_id=${selectedVerticalId}&from=${selectedDateFrom}&to=${selectedDateTo}&sn_id=${platformValue}&adset_id=${adsetId}&campaign_id=${campaignId}&ads_account_id=${adsAccountId}`,
      setTableDataKeyword,
    ).finally(() => setIsLoadingKeyword(false));
  };

  useEffect(() => {
    if (selectedVerticalId && selectedDateFrom && selectedDateTo && platformValue) {
      setIsLoadingCamp(true);
      fetchTableData(
        `${BASE_URL}/${api_version}/report/campaigns?vertical_id=${selectedVerticalId}&from=${selectedDateFrom}&to=${selectedDateTo}&sn_id=${platformValue}`,
        setTableData,
      ).finally(() => setIsLoadingCamp(false));
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
        {/* Si isLoading est vrai, afficher l'indicateur de chargement */}
        {isLoadingCamp && (
          <TableRow>
            <TableCell colSpan={11} align="center">
              <CircularProgress />
            </TableCell>
          </TableRow>
        )}
        {/* Si tableData est vide, afficher un message */}
        {tableData.length === 0 && !isLoadingCamp && (
          <TableRow>
            <TableCell colSpan={11} align="center">
              Aucune information n'est disponible.
            </TableCell>
          </TableRow>
        )}
        {/* Sinon, afficher les données */}
        {!isLoadingCamp &&
          tableData.map((rowData, index) => (
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
                  <TableCell colSpan={12} className="td_table_platform">
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
                        {/* Si isLoading est vrai, afficher l'indicateur de chargement */}
                        {isLoadingAdset && (
                          <TableRow>
                            <TableCell colSpan={11} align="center">
                              <CircularProgress />
                            </TableCell>
                          </TableRow>
                        )}
                        {/* Si tableDataAdset est vide, afficher un message 11*/}
                        {tableDataAdset.length === 0 && !isLoadingAdset && (
                          <TableRow>
                            <TableCell colSpan={11} align="center">
                              Aucune information n'est disponible c'est est ub boucle il y a l'erreu
                              .
                            </TableCell>
                          </TableRow>
                        )}
                        {/* Sinon, afficher les données */}
                        {!isLoadingAdset &&
                          campaignAdsetData[rowData.campaign_id] &&
                          campaignAdsetData[rowData.campaign_id].map((rowDataAdset, index) => (
                            <React.Fragment key={index}>
                              <TableRow className={rowDataAdset.isOpen ? 'tableRowOpen2' : ''}>
                                <TableCell className="tab-button">
                                  <IconButton
                                    onClick={() => {
                                      const newData = [...tableDataAdset];
                                      newData[index].isOpen = !newData[index].isOpen;
                                      setTableDataAdset(newData);
                                      handleAdsetTableCellClick(
                                        rowDataAdset.adset_id,
                                        rowData.campaign_id,
                                        rowData.ads_account_id,
                                      );
                                    }}
                                  >
                                    {rowDataAdset.isOpen ? (
                                      <RemoveCircleOutlinedIcon style={{ color: '#ffffff' }} />
                                    ) : (
                                      <AddCircleOutlinedIcon style={{ color: '#168BC4' }} />
                                    )}
                                  </IconButton>
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                  {rowData.ads_account_name}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                  <Switch checked={rowDataAdset.status} />
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                  {rowDataAdset.adset_id}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                  {rowDataAdset.adset_name}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                  {rowDataAdset.leads}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                  {formatCpl(rowDataAdset.spend)} €
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                  <Typography className="badge">
                                    {formatCpl(rowDataAdset.cpl)} €
                                  </Typography>
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}></TableCell>
                                <TableCell sx={{ textAlign: 'center' }}></TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>-</TableCell>
                              </TableRow>
                              {rowDataAdset.isOpen && (
                                <TableRow>
                                  <TableCell colSpan={12} className="td_table_platform">
                                    {platformValue == 2 || platformValue == 7 ? (
                                      <Table>
                                        <TableHead>
                                          <TableRow sx={{ backgroundColor: '#E7A33D' }}>
                                            {renderTableCells([
                                              '',
                                              'NAME ACCOUNT',
                                              'ON/OFF',
                                              'ID',
                                              'KEYWORDS',
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
                                          {/* Si isLoading est vrai, afficher l'indicateur de chargement */}
                                          {isLoadingKeyword && (
                                            <TableRow>
                                              <TableCell colSpan={11} align="center">
                                                <CircularProgress />
                                              </TableCell>
                                            </TableRow>
                                          )}
                                          {/* Si tableDataKeyword est vide, afficher un message */}
                                          {tableDataKeyword.length === 0 && !isLoadingKeyword && (
                                            <TableRow>
                                              <TableCell colSpan={11} align="center">
                                                Aucune information n'est disponible.
                                              </TableCell>
                                            </TableRow>
                                          )}
                                          {/* Sinon, afficher les données */}
                                          {!isLoadingKeyword &&
                                            tableDataKeyword.map((rowDataKeyword, index) => (
                                              <TableRow
                                                key={index}
                                                className={
                                                  rowDataAdset.isOpen ? 'tableRowOpen3' : ''
                                                }
                                              >
                                                <TableCell className="tab-button"></TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                  {rowData.ads_account_name}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                  <Switch checked={rowDataKeyword.status} />
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                  {rowDataKeyword.keyword_id}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                  {rowDataKeyword.keyword_name}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                  {rowDataKeyword.leads}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                  {formatCpl(rowDataKeyword.spend)} €
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                  <Typography className="badge">
                                                    {formatCpl(rowDataKeyword.cpl)} €
                                                  </Typography>
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}></TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}></TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                  -
                                                </TableCell>
                                              </TableRow>
                                            ))}
                                        </TableBody>
                                      </Table>
                                    ) : (
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
                                          {/* Si isLoading est vrai, afficher l'indicateur de chargement */}
                                          {isLoadingAds && (
                                            <TableRow>
                                              <TableCell colSpan={11} align="center">
                                                <CircularProgress />
                                              </TableCell>
                                            </TableRow>
                                          )}
                                          {/* Si tableDataAds est vide, afficher un message */}
                                          {tableDataAds.length === 0 && !isLoadingAds && (
                                            <TableRow>
                                              <TableCell colSpan={11} align="center">
                                                Aucune information n'est disponible.
                                              </TableCell>
                                            </TableRow>
                                          )}
                                          {/* Sinon, afficher les données */}
                                          {!isLoadingAds &&
                                            tableDataAds.map((rowDataAds, index) => (
                                              <TableRow
                                                key={index}
                                                className={
                                                  rowDataAdset.isOpen ? 'tableRowOpen3' : ''
                                                }
                                              >
                                                <TableCell className="tab-button"></TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                  {rowData.ads_account_name}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                  <Switch checked={rowDataAds.status} />
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                  {rowDataAds.ad_id}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                  {rowDataAds.ad_name}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                  {rowDataAds.leads}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                  {formatCpl(rowDataAds.spend)} €
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                  <Typography className="badge">
                                                    {formatCpl(rowDataAds.cpl)} €
                                                  </Typography>
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}></TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}></TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                  -
                                                </TableCell>
                                              </TableRow>
                                            ))}
                                        </TableBody>
                                      </Table>
                                    )}
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
