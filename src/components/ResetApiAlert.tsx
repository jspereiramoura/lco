import { Alert, Button } from "@mui/material";
import { runSeed } from "../services/resetApiService";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

const ResetApiAlert = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.globalLoader.isLoading);

  return (
    <Alert severity="info" sx={{ mb: 2 }}>
      <h2>Reset API</h2>
      <p>
        Por se tratar de uma API pública pode ser que algumas imagens ou
        descrição estejam com problema, devido a testes de outros
        desenvolvedores. Clique no botão abaixo para resetar a API e corrigir
        esses problemas.
      </p>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => runSeed(dispatch)}
        disabled={isLoading}
      >
        Resetar API
      </Button>
    </Alert>
  );
};

export default ResetApiAlert;
