import { Button } from '@material-ui/core';
import React from 'react';

export function LetterFormButtons({
  handleDialog,
  handleSaveDialog,
  loading,
  isPermission,
  handleGetTemplate,
}) {
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        //workaround for clearing fields in current component
        onClick={() => (handleDialog ? handleDialog() : handleSaveDialog())}
        disabled={loading || isPermission}
      >
        Save
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        onClick={handleGetTemplate}
        disabled={loading}
      >
        Preview
      </Button>
    </>
  );
}
