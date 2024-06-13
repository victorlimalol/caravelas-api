import { Router } from "express";
import multer from "multer";
import { atualizarAgendamento, criarAgendamento, deletarAgendamento, listarAgendamentos, listarAgendamentosPorEstabelecimento } from "../repository/agendamentoRepository.js";

let router = Router();

const upload = multer({ dest: 'storage/produto' })

router.post("/agendamento/cadastrar", upload.single('imagem'), async (req, resp) => {
    let {
        nome,
        cpf,
        telefone,
        dataMarcada,
        estabelecimento_id
    } = req.body;

    // let imagem = req.file.path;

    if (
        !nome,
        !cpf,
        !telefone,
        !dataMarcada,
        !estabelecimento_id
    ) {
        return resp
            .status(400)
            .send(
                "Solicitação inválida. Verifique os dados enviados e tente novamente."
            );
    }

    let servicoRegister = await criarAgendamento({
        nome,
        cpf,
        telefone,
        dataMarcada,
        estabelecimento_id
    });

    return resp.status(201).send(servicoRegister);
});

router.get("/agendamento/listar", async (req, resp) => {
    let budgets = await listarAgendamentos();
    return resp.status(200).send(budgets);
});

router.get("/agendamento/listar/:estabelecimentoId", async (req, resp) => {
    let estabelecimentoId = req.params.categoryId;
    let budgets = await listarAgendamentosPorEstabelecimento(estabelecimentoId);
    return resp.status(200).send(budgets);
});

router.delete("/agendamento/:id", async (req, resp) => {
    let budgetId = req.params.id;
    let deleteStatus = await deletarAgendamento(budgetId);

    if (!deleteStatus) {
        return resp
            .status(400)
            .send("Solicitação inválida. Verifique o id, e tente novamente");
    }

    return resp.status(200).send("Produto excluído com sucesso.");
});

router.put("/agendamento/:id", upload.single('imagem'), async (req, resp) => {
    let budgetId = req.params.id;
    let {
        nome,
        cpf,
        telefone,
        dataMarcada,
        estabelecimento_id
    } = req.body;

    let updateStatus = await atualizarAgendamento(budgetId, {
        nome,
        cpf,
        telefone,
        dataMarcada,
        estabelecimento_id
    });

    if (!updateStatus) {
        return resp
            .status(400)
            .send("Solicitação inválida. Verifique o id, e tente novamente");
    }

    return resp.status(200).send("Produto atualizado com sucesso.");
});

export default router;
