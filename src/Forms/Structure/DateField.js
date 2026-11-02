import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';
import { formatDate, parseDisplayDate } from '../../Functions/DateFormat';

const CalendarIcon = () => (
  <SvgIcon fontSize="small" viewBox="0 0 24 24">
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 16H5V9h14v11ZM7 11h5v5H7z" />
  </SvgIcon>
);

export default function DateField({
  value = '',
  name,
  onChange,
  onBlur,
  inputProps = {},
  InputLabelProps,
  InputProps,
  error,
  helperText,
  ...textFieldProps
}) {
  const [displayValue, setDisplayValue] = useState(() => formatDate(value));
  const [displayError, setDisplayError] = useState('');
  const lastEmittedValue = useRef(value || '');
  const pickerRef = useRef(null);

  useEffect(() => {
    if ((value || '') !== lastEmittedValue.current) {
      setDisplayValue(formatDate(value));
      setDisplayError('');
      lastEmittedValue.current = value || '';
    }
  }, [value]);

  const emit = (nextValue) => {
    lastEmittedValue.current = nextValue;
    onChange?.({ target: { name, value: nextValue } });
  };

  const updateText = (event) => {
    const nextDisplayValue = event.target.value;
    const nextValue = parseDisplayDate(nextDisplayValue);
    setDisplayValue(nextDisplayValue);
    setDisplayError(
      nextDisplayValue.length === 10 && !nextValue
        ? 'Ingrese una fecha válida en formato dd/mm/yyyy.'
        : ''
    );
    emit(nextValue);
  };

  const updateFromPicker = (event) => {
    const nextValue = event.target.value;
    setDisplayValue(formatDate(nextValue));
    setDisplayError('');
    emit(nextValue);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <InputMask
        mask="99/99/9999"
        maskChar={null}
        name={name}
        onBlur={onBlur}
        onChange={updateText}
        value={displayValue}
      >
        {(maskedProps) => (
          <TextField
            {...maskedProps}
            {...textFieldProps}
            error={Boolean(error || displayError)}
            helperText={displayError || helperText}
            InputLabelProps={{ shrink: true, ...InputLabelProps }}
            InputProps={{
              ...InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Seleccionar fecha"
                    edge="end"
                    onClick={() => {
                      if (pickerRef.current?.showPicker) {
                        pickerRef.current.showPicker();
                      } else {
                        pickerRef.current?.click();
                      }
                    }}
                    size="small"
                    type="button"
                  >
                    <CalendarIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            inputProps={{
              ...inputProps,
              inputMode: 'numeric',
              placeholder: 'dd/mm/yyyy',
            }}
            name={name}
            type="text"
          />
        )}
      </InputMask>
      <input
        aria-hidden="true"
        max={inputProps.max}
        min={inputProps.min}
        onChange={updateFromPicker}
        ref={pickerRef}
        style={{
          height: 1,
          opacity: 0,
          pointerEvents: 'none',
          position: 'absolute',
          right: 0,
          top: 0,
          width: 1,
        }}
        tabIndex={-1}
        type="date"
        value={value || ''}
      />
    </Box>
  );
}
