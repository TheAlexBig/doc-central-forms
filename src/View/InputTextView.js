import React, { useState } from "react";
import InputMask from "react-input-mask";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";

const InputTextView = (props) => {
  const [isError, setIsError] = useState({
    error: false,
    errorMessage: "",
  });
  const [dispone, setDispone] = useState(true);

  let typeInput = null;
  const nit = "9999-999999-999-9";
  const dui = "99999999-9";

  const style = {
    container: {
      display: "flex",
      justifyContent: "space-between",
      // //flexDirection: "column",
      // margin: "0px 0px 15px 0px",
    },
  };

  const validateText = () => {
    if (!/^(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)+$/.test(props.atributo.value)) {
      setIsError({
        error: true,
        errorMessage: "Solo se admiten letras",
      });
    } else {
      setIsError({
        error: false,
        errorMessage: "",
      });
    }
  };
  const validateTextNumber = () => {
    if (!/^[A-Z\-0-9]+$/.test(props.atributo.value)) {
      setIsError({
        error: true,
        errorMessage: "Solo se admiten numeros y letras mayusculas",
      });
    } else {
      setIsError({
        error: false,
        errorMessage: "",
      });
    }
  };
  const validateDocument = () => {
    if (props.atributo.label === "Documento") {
      if (props.atributo.value.length < 10) {
        setIsError({
          error: true,
          errorMessage: "No se permiten campos imcompletos",
        });
      } else {
        setIsError({
          error: false,
          errorMessage: "",
        });
      }
    } else {
      if (props.atributo.value.length < 15) {
        setIsError({
          error: true,
          errorMessage: "Por favor completar este campo",
        });
      } else {
        setIsError({
          error: false,
          errorMessage: "",
        });
      }
    }
  };

  const input = (toMask) => {
    if (toMask == null) {
      if (props.atributo.type === "text") {
        typeInput = (
          <TextField
            error={isError.error}
            helperText={isError.errorMessage}
            style={style.container}
            label={props.atributo.label}
            onChange={props.changed}
            onBlur={validateText}
            onKeyUp={validateText}
            required
          />
        );
      } else {
        if (props.atributo.type === "text-num") {
          typeInput = (
            <TextField
              onBlur={validateTextNumber}
              onKeyUp={validateTextNumber}
              error={isError.error}
              helperText={isError.errorMessage}
              style={style.container}
              label={props.atributo.label}
              onChange={props.changed}
              required
            />
          );
        } else {
          typeInput = (
            <FormGroup row style={style.container}>
              <TextField
                onBlur={validateTextNumber}
                onKeyUp={validateTextNumber}
                error={isError.error}
                helperText={isError.errorMessage}
                style={{ width: "65%" }}
                label={props.atributo.label}
                onChange={props.changed}
                disabled={!dispone}
                required
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    onClick={() => setDispone(!dispone)}
                    onChange={props.changed}
                    value="NA"
                    color="primary"
                    size="small"
                    name="dispone"
                  />
                }
                label="Dispone"
              />
            </FormGroup>
          );
        }
      }
    } else {
      typeInput = (
        <InputMask
          mask={toMask}
          onChange={props.changed}
          maskChar=""
          onBlur={validateDocument}
        >
          {() => (
            <TextField
              error={isError.error}
              helperText={isError.errorMessage}
              style={style.container}
              label={props.atributo.label}
              onChange={props.changed}
              required
            />
          )}
        </InputMask>
      );
    }
    return typeInput;
  };

  switch (props.atributo.label) {
    case "Documento": {
      input(dui);
      break;
    }
    case "NIT": {
      input(nit);
      break;
    }
    default: {
      input(null);
      break;
    }
  }
  return <div>{typeInput}</div>;
};
export default InputTextView;
