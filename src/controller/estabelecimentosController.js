import multer from "multer";
import {
    createEstabelecimento,
    listEstabelecimentos,
    getEstabelecimentoById,
    deleteEstabeleciemento,
    updateEstabelecimento,
} from "../repository/estabelecimentoRepository.js";
import upload from '../middlewares/uploadImage.js'
import { Router } from "express";

let router = Router();


router.post("/estabelecimento/create", upload.single('imagem'), async (req, resp) => {
    let { endereco, descricao, predio, metragem, diaria } = req.body;

    let imagem = req.file.filename;

    if (!endereco || !descricao || !predio || !metragem || !diaria || !imagem) {
        return resp
            .status(400)
            .send("Invalid request. Check the data sent and try again.");
    }

    let course = await createEstabelecimento({
        endereco, descricao, predio, metragem, diaria, imagem
    });

    return resp.status(201).send(course);
});

router.get("/estabelecimento/list", async (req, resp) => {
    let courses = await listEstabelecimentos();
    return resp.status(200).send(courses);
});

router.get("/estabelecimento/:id", async (req, resp) => {
    let estabeleciementoId = req.params.id;
    let course = await getEstabelecimentoById(estabeleciementoId);

    if (!course) {
        return resp.status(404).send("Course not found.");
    }

    return resp.status(200).send(course);
});

router.delete("/estabelecimento/:id", async (req, resp) => {
    let estabeleciementoId = req.params.id;
    let deleteStatus = await deleteEstabeleciemento(estabeleciementoId);

    if (!deleteStatus) {
        return resp.status(404).send("Course not found.");
    }

    return resp.status(204).send();
});

router.put("/estabelecimento/:id", upload.single('imagem'), async (req, resp) => {
    let courseId = req.params.id;
    let { endereco, descricao, predio, metragem, diaria } = req.body;

    let imagem = req.file.path;

    if (!endereco || !descricao || !predio || !metragem || !diaria || !imagem) {
        return resp
            .status(400)
            .send("Invalid request. Check the data sent and try again.");
    }

    let updateStatus = await updateEstabelecimento(courseId, {
        endereco, descricao, predio, metragem, diaria, imagem
    });

    if (!updateStatus) {
        return resp.status(404).send("Course not found.");
    }

    return resp.status(200).send(updateStatus);
});

export default router;
