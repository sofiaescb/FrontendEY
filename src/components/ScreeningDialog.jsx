import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import GlobeIcon from '@mui/icons-material/Public';

const ScreeningDialog = ({
  open,
  onClose,
  supplier,
  url,
  onUrlChange,
  onSubmit
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Supplier Screening</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          Enter a website URL to perform web scraping analysis for <strong>{supplier?.name}</strong>.
        </DialogContentText>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              id="screening-url"
              label="Website URL"
              type="url"
              value={url}
              onChange={(e) => onUrlChange(e.target.value)}
              fullWidth
              placeholder="https://example.com"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          disabled={!url}
          startIcon={<GlobeIcon fontSize="small" />}
        >
          Start Screening
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScreeningDialog;
