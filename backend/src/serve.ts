import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import main from "./db/conn";

const tokensRevogados: Set<string> = new Set();

const app = express();
const PORT: number = 3000;
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados

main();

// Modelo de usuário
interface UsuarioModel extends mongoose.Document {
  nome: string;
  sobrenome: string;
  dataNascimento: string;
  telefone: number;
  cpf: string;
  email: string;
  senha: string;
}

const Usuario = mongoose.model<UsuarioModel>("Usuario",
  new mongoose.Schema({
    nome: String,
    sobrenome: String,
    dataNascimento: String,
    telefone: Number,
    cpf: String,
    email: String,
    senha: String,
  })
);

router.post('/refresh-token', async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  // lógica para verificar o refreshToken e gerar um novo token
  try {
    // Verificar se o refreshToken é válido
    const decoded: any = jwt.verify(refreshToken, '60520c337bf7e3df97b1324e0c1646a90fc61de3d2be40f3612bbc3f128614b1');

    //token
    const newToken = jwt.sign(
      {
        cpf: decoded.cpf,
        nome: decoded.nome,
        sobrenome: decoded.sobrenome,
      },
      '60520c337bf7e3df97b1324e0c1646a90fc61de3d2be40f3612bbc3f128614b1',
      { expiresIn: '1h' } // Defina o tempo de expiração desejado
    );

    // Enviar o novo token como resposta
    res.json({ success: true, newToken });
  } catch (error) {
    console.error('Erro ao renovar o token:', error);
    res.status(401).json({ success: false, message: 'Erro ao renovar o token.' });
  }
});


app.use('/paciente', router);
// Rota de cadastro de usuário
app.post("/cadastro", async (req: Request, res: Response) => {
  const {
    nome,
    sobrenome,
    dataNascimento,
    telefone,
    cpf,
    email,
    senha,
    confirmacaoSenha,
  } = req.body;

  try {
    // Verificar se o CPF já está cadastrado
    const usuarioExistente = await Usuario.findOne({ cpf });
    if (usuarioExistente) {
      return res
        .status(400)
        .json({ success: false, message: "CPF já cadastrado." });
    }

    // Verificar se o e-mail já está cadastrado
    const emailExistente = await Usuario.findOne({ email });
    if (emailExistente) {
      return res
        .status(400)
        .json({ success: false, message: "E-mail já cadastrado." });
    }

    // Verificar se o telefone já está cadastrado
    const telefoneExistente = await Usuario.findOne({ telefone });
    if (telefoneExistente) {
      return res
        .status(400)
        .json({ success: false, message: "Telefone já cadastrado." });
    }

    if (senha.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "A senha deve ter pelo menos 8 caracteres." });
    }

    // Verificar se a senha e a confirmação de senha são iguais
    if (senha !== confirmacaoSenha) {
      return res.status(400).json({
        success: false,
        message: "A senha e a confirmação de senha não coincidem.",
      });
    }

    // Criar um novo usuário no banco de dados
    const novoUsuario = new Usuario({
      nome,
      sobrenome,
      dataNascimento,
      cpf,
      email,
      senha,
      telefone,
    });
    await novoUsuario.save();

    res.json({ success: true, message: "Cadastro realizado com sucesso." });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro interno ao cadastrar usuário." });
  }
});

// Rota de login de usuário
app.post("/login", async (req: Request, res: Response) => {
  const { cpf, senha } = req.body;

  try {
    // Consultar o usuário no banco de dados pelo CPF
    const usuario = await Usuario.findOne({ cpf });

    if (!usuario || usuario.senha !== senha) {
      return res
        .status(401)
        .json({ success: false, message: "Credenciais inválidas." });
    }

    const token = jwt.sign(
      {
        cpf: usuario.cpf,
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
      },
      "60520c337bf7e3df97b1324e0c1646a90fc61de3d2be40f3612bbc3f128614b1",
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      message: "Autenticação bem-sucedida.",
      token,
    });
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    res.status(500).json({
      success: false,
      message: "Erro interno ao autenticar usuário.",
    });
  }
});

// Rota para obter informações do usuário autenticado
app.get("/usuario", async (req: Request, res: Response) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token não fornecido." });
  }

  try {
    const decoded: any = jwt.verify(
      token,
      "60520c337bf7e3df97b1324e0c1646a90fc61de3d2be40f3612bbc3f128614b1"
    );

    console.log("Payload do Token:", decoded);

    const usuarioAutenticado = await Usuario.findOne({ cpf: decoded.cpf });

    if (usuarioAutenticado) {
      res.json({
        success: true,
        message: "Informações do usuário obtidas com sucesso.",
        usuario: {
          nome: usuarioAutenticado.nome,
          sobrenome: usuarioAutenticado.sobrenome,
          dataNascimento: usuarioAutenticado.dataNascimento,
          cpf: usuarioAutenticado.cpf,
          email: usuarioAutenticado.email,
        },
      });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Usuário não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao verificar o token:", error);
    res.status(401).json({ success: false, message: "Token inválido." });
  }
});

// Rota para logout do usuário
app.post("/logout", (req: Request, res: Response) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.json({
      success: true,
      message: "Logout realizado com sucesso.",
    });
  }

  try {
    // Verificar se o token está na lista de tokens revogados
    if (tokensRevogados.has(token)) {
      return res
        .status(401)
        .json({ success: false, message: "Token já revogado." });
    }

    // Adicionar o token à lista de tokens revogados
    tokensRevogados.add(token);

    res.json({ success: true, message: "Logout realizado com sucesso." });
  } catch (error) {
    console.error("Erro ao revogar o token:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro interno ao revogar o token." });
  }
});

app.route('/paciente')
  .get(async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Token não fornecido.' });
    }

    try {
      // Verificar o token
      const decoded: any = jwt.verify(token, '60520c337bf7e3df97b1324e0c1646a90fc61de3d2be40f3612bbc3f128614b1');

      const paciente = await Usuario.findOne({ cpf: decoded.cpf });

      if (paciente) {
        res.json({
          success: true,
          message: 'Informações do paciente obtidas com sucesso.',
          paciente: {
            nome: paciente.nome,
            sobrenome: paciente.sobrenome,
            dataNascimento: paciente.dataNascimento,
            cpf: paciente.cpf,
            email: paciente.email,
            // Adicione outros campos conforme necessário
          },
        });
      } else {
        res.status(404).json({ success: false, message: 'Paciente não encontrado.' });
      }
    } catch (error) {
      console.error('Erro ao verificar o token:', error);
      res.status(401).json({ success: false, message: 'Token inválido.' });
    }
  })
  .put(async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Token não fornecido.' });
    }

    try {
      // Verificar o token
      const decoded: any = jwt.verify(token, '60520c337bf7e3df97b1324e0c1646a90fc61de3d2be40f3612bbc3f128614b1');

      // O token é válido, obtém as informações do paciente
      const paciente = await Usuario.findOne({ cpf: decoded.cpf });

      if (paciente) {
        // Atualiza os dados do paciente
        paciente.email = req.body.email || paciente.email;
        paciente.senha = req.body.senha || paciente.senha;

        await paciente.save();

        res.json({ success: true, message: 'Dados do paciente atualizados com sucesso.' });
      } else {
        res.status(404).json({ success: false, message: 'Paciente não encontrado.' });
      }
    } catch (error) {
      console.error('Erro ao verificar o token:', error);
      res.status(401).json({ success: false, message: 'Token inválido.' });
    }
  });

app.listen(PORT, () => {
  console.log(`Servidor em execução http://localhost:${PORT}`);
});
