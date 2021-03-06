import "./PaletaLista.css";
import { useState, useEffect } from "react";
import PaletaListaItem from "components/PaletaListaItem/PaletaListaItem";
import { PaletaService } from "services/PaletaService";
import PaletaDetalhesModal from "components/PaletaDetalhesModal/PaletaDetalhesModal";

function PaletaLista() {
	const [paletas, setPaletas] = useState([]);

	const [paletasSelecionadas, setQuantidade] = useState({});

	const [paletaModal, setPaletaModal] = useState(false);

	const adicionarItem = (paletaIndex) => {
		const paleta = { [paletaIndex]: (paletasSelecionadas[paletaIndex] || 0) +1 }
		setQuantidade({ ...paletasSelecionadas, ...paleta});
	}

	const removerItem = (paletaIndex) => {
		const paleta = { [paletaIndex]: Number(paletasSelecionadas[paletaIndex] || 0) -1 }
		setQuantidade({ ...paletasSelecionadas, ...paleta});
	}

	const getLista = async () => {
		const response = await PaletaService.getLista();
		setPaletas(response);
	}

	const getPaletaById = async (paletaId) => {
		const response = await PaletaService.getById(paletaId);
		setPaletaModal(response);
	}

	useEffect(() => {
		getLista();
	}, [])

	return (
		<div className="PaletaLista">
			{paletas.map((paleta, index) =>
				<PaletaListaItem
					key={`PaletaListaItem-${index}`}
					paleta={paleta}
					quantidadeSelecionada={paletasSelecionadas[index]}
					index={index}
					onAdd={index => adicionarItem(index)}
					onRemove={index => removerItem(index)}
					clickItem={(paletaId) => getPaletaById(paletaId)} />
				)
			}
			{paletaModal && <PaletaDetalhesModal paleta={paletaModal} closeModal={() => setPaletaModal(false)} />}
		</div>
	);
}

export default PaletaLista;
