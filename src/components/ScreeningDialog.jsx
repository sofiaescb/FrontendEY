import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { getMultipleScreeningResults } from '../services/scrapingService';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Tabs,
  Tab,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';

const screeningSources = [
  { key: 'ofac', label: 'OFAC' },
  { key: 'worldbank', label: 'The World Bank' }
];


export default function ScreeningDialog({ open, onClose, supplier }) {
  const [step, setStep] = useState(0); // 0: select sources, 1: show results
  const [selectedSources, setSelectedSources] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState({});
  const rowsPerPage = 3;

  const handleSourceChange = (event) => {
    const { checked, name } = event.target;
    setSelectedSources((prev) =>
      checked ? [...prev, name] : prev.filter((src) => src !== name)
    );
  };

  const handleStartScreening = async () => {
    if (selectedSources.length > 0 && supplier?.razonSocial) {
      setLoading(true);
      try {
        const res = await getMultipleScreeningResults(selectedSources, supplier.razonSocial);
        setResults(res);
        setStep(1);
      } catch (error) {
        setResults({});
      }
      setLoading(false);
    }
  };

  const handleNewScreening = () => {
    setStep(0);
    setSelectedSources([]);
    setActiveTab(0);
    setResults({});
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handlePageChange = (fuente, value) => {
    setPage((prev) => ({ ...prev, [fuente]: value }));
  };

  const handleClose = () => {
    setStep(0);
    setSelectedSources([]);
    setActiveTab(0);
    setResults({});
    setPage({});
    setLoading(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          maxWidth: '900px',
          width: '100%',
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
        }
      }}
    >
      {step === 0 ? (
        <>
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}>
            <Box>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
                Screening de Proveedor
              </Typography>
            </Box>
            <IconButton onClick={handleClose} size="small" sx={{ ml: 2 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent
            sx={{
              flex: 1,
              overflowY: 'auto',
              p: 3,
              borderTop: '1px solid rgba(0, 0, 0, 0.12)',
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
            }}
          >
            <Typography gutterBottom>
              Selecciona las fuentes para analizar a <strong>{supplier?.razonSocial}</strong>.
            </Typography>
            <Box mt={2}>
              <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend">Fuentes:</FormLabel>
                <FormGroup>
                  {screeningSources.map((src) => (
                    <FormControlLabel
                      key={src.key}
                      control={
                        <Checkbox
                          checked={selectedSources.includes(src.key)}
                          onChange={handleSourceChange}
                          name={src.key}
                          sx={{ color: '#FFD600', '&.Mui-checked': { color: '#FFD600' } }}
                        />
                      }
                      label={src.label}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cerrar</Button>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Button
                onClick={handleStartScreening}
                variant="contained"
                disabled={selectedSources.length === 0 || loading}
                startIcon={<PublicIcon fontSize="small" />}
                sx={{ bgcolor: '#FFD600', color: '#000', fontWeight: 500, '&:hover': { bgcolor: '#ffcf00' } }}
              >
                Iniciar Screening
              </Button>
              {loading && (
                <CircularProgress size={24} sx={{ color: '#FFD600', position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px', zIndex: 1 }} />
              )}
            </Box>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}>
            <Box>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
                Screening de Proveedor
              </Typography>
            </Box>
            <IconButton onClick={handleClose} size="small" sx={{ ml: 2 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent
            sx={{
              flex: 1,
              overflowY: 'auto',
              p: 3,
              borderTop: '1px solid rgba(0, 0, 0, 0.12)',
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
            }}
          >
            {Object.keys(results).length === 0 && (
              <Typography gutterBottom>
                Selecciona el tipo de screening para analizar a "{supplier?.razonSocial}".
              </Typography>
            )}
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ mb: 2 }}
            >
              {selectedSources.map((srcKey) => (
                <Tab key={srcKey} label={screeningSources.find((s) => s.key === srcKey)?.label + ' Resultados'} />
              ))}
            </Tabs>
            {loading ? (
              <Box textAlign="center" py={4}>
                <CircularProgress color="warning" size={40} />
                <Typography variant="body1" mt={2}>Cargando resultados...</Typography>
              </Box>
            ) : (
              selectedSources.map((srcKey, idx) => {
                const currentPage = page[srcKey] || 1;
                const allRows = results[srcKey]?.resultados || [];
                const totalRows = allRows.length;
                const paginatedRows = allRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
                return (
                  <Box key={srcKey} hidden={activeTab !== idx}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                      Total de resultados: {results[srcKey]?.totalResultados ?? 0}
                    </Typography>
                    <TableContainer 
                      component={Paper} 
                      variant="outlined" 
                      sx={{ 
                        mb: 2,
                        maxHeight: '300px',
                        overflow: 'auto'
                      }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            {srcKey === 'ofac' ? (
                              <>
                                <TableCell>Name</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Program(s)</TableCell>
                                <TableCell>List</TableCell>
                                <TableCell>Score</TableCell>
                              </>
                            ) : (
                              <>
                                <TableCell>Firm Name</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Country</TableCell>
                                <TableCell>From Date</TableCell>
                                <TableCell>To Date</TableCell>
                                <TableCell>Grounds</TableCell>
                              </>
                            )}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {paginatedRows.map((row, i) => (
                            <TableRow key={i}>
                              {srcKey === 'ofac' ? (
                                <>
                                  <TableCell><strong>{row.Name}</strong></TableCell>
                                  <TableCell>{row.Address}</TableCell>
                                  <TableCell>{row.Type}</TableCell>
                                  <TableCell>{row.Programs}</TableCell>
                                  <TableCell>{row.List}</TableCell>
                                  <TableCell>{row.Score}</TableCell>
                                </>
                              ) : (
                                <>
                                  <TableCell><strong>{row.FirmName}</strong></TableCell>
                                  <TableCell>{row.Address}</TableCell>
                                  <TableCell>{row.Country}</TableCell>
                                  <TableCell>{row.FromDate}</TableCell>
                                  <TableCell>{row.ToDate}</TableCell>
                                  <TableCell>{row.Grounds}</TableCell>
                                </>
                              )}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {totalRows > rowsPerPage && (
                      <Box display="flex" justifyContent="center" mb={2}>
                        <Pagination
                          count={Math.ceil(totalRows / rowsPerPage)}
                          page={currentPage}
                          onChange={(_, value) => handlePageChange(srcKey, value)}
                          color="primary"
                        />
                      </Box>
                    )}
                    {totalRows === 0 && (
                      <Typography color="error" variant="body2" sx={{ textAlign: 'center', py: 2 }}>
                        No se encontraron resultados para esta fuente.
                      </Typography>
                    )}
                  </Box>
                );
              })
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNewScreening}>New Screening</Button>
            <Button onClick={handleClose} variant="contained" sx={{ bgcolor: '#FFD600', color: '#000', fontWeight: 500, '&:hover': { bgcolor: '#ffcf00' } }}>Close</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
