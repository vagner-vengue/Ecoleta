import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from "react-leaflet";   // TileLayer é o estido do mapa.
import { LeafletMouseEvent } from 'leaflet';
import api from '../../services/api';
import axios from 'axios';
import DropZone from "../../components/Dropzone";

import './styles.css';
import logo from '../../assets/logo.svg';

// State de array ou objeto: manualmente informar o tipo da variável, através de uma interface
interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

const CreatePoint = () => {
    
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    const [selectedUF, setSelectedUF] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedFile, setSelectedFile] = useState<File>();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    });

    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const history = useHistory();

    useEffect(() => {
        api.get('items').then(
            response => {
                setItems(response.data);
            }
        );
    }, []);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials);
        });
    }, []);

    // Muda os municípios cada vez que a UF selecionada mudar.
    useEffect(() => {
        if (selectedUF === '0')
            return;

        const URLApi = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + selectedUF + '/municipios';
        axios.get<IBGECityResponse[]>(URLApi).then(response => {
            const cityNames = response.data.map(city => city.nome);
            setCities(cityNames);
        });
    }, [selectedUF]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            const { latitude, longitude } = pos.coords;
            setInitialPosition([latitude, longitude]);
            setSelectedPosition([latitude, longitude]);
            console.log(latitude, longitude);
        });
    }, []);

    function handleSelectedUF(event: ChangeEvent<HTMLSelectElement>){
        setSelectedUF(event.target.value);
    }

    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>){
        setSelectedCity(event.target.value);
    }

    function handleMapClick(event: LeafletMouseEvent){
        setSelectedPosition([event.latlng.lat, event.latlng.lng]);
    }
    
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        // event.target retorna exatamente o elemento html que disparou o evento.
        const { name, value } = event.target;

        // No código abaixo, o 'spread operator' retorna os dados atuais o formData.
        // E [] serve para a utilização de uma variável, que será o nome do elemento html
        // E o nome da propriedade de formData é o mesmo nome dos elementos html.
        setFormData({ ...formData, [name]: value});
    }

    function handleSelectedItem(id: number){
        // findIndex retornará -1 se o item não for encontrado.
        const alreadySelected = selectedItems.findIndex(i => i === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(i => i !== id);
            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([ ...selectedItems, id ]);
        }
    }

    async function handleSubmit(event: FormEvent){
        // Evita que o site seja direcionado para uma página de default error.
        event.preventDefault();

        const { name, email, whatsapp } = formData;
        const uf = selectedUF;
        const city = selectedCity;
        const [ latitude, longitude ] = selectedPosition;
        const items = selectedItems;
        
        // const data = {
        //     name,
        //     email,
        //     whatsapp,
        //     uf,
        //     city,
        //     latitude,
        //     longitude,
        //     items};

        // FormData é utilizado para poder enviar uma solicitação do tipo Multipart, ao invés de JSON.
        // Se não fosse pelo arquivo, poderia ser só um "api.post('points', data);"
        const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('uf', uf);
        data.append('city', city);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('items', items.join(','));

        console.log(selectedFile?.name)
        if (selectedFile)
            data.append('image', selectedFile);
        
        console.log(data);
        await api.post('points', data);

        alert('Ponto de coleta criado!');

        // Retorna para o diretório raíz.
        history.push('/');
    }

    return(
        <div id="page-create-point">
            
            <header>
                <img src={logo} alt="Ecoleta"/>

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br /> ponto de coleta</h1>

                {/* Drop de arquivos */}
                <DropZone onFileUploaded={setSelectedFile} />

                {/* Fielset Dados */}
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    {/* Campo Nome */}
                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleInputChange} />
                    </div>

                    <div className="field-group">
                        {/* Campo E-mail */}
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange} />
                        </div>

                        {/* Campo Whatsapp */}
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input 
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleInputChange} />
                        </div>
                    </div>
                </fieldset>

                {/* Fieldset Endereço */}
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    {/* MAPA */}
                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        
                        <Marker position={selectedPosition} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf" value={selectedUF} onChange={handleSelectedUF}>
                                <option key="0" value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" value={selectedCity} onChange={handleSelectedCity} >
                                <option key="0" value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                {/* Fieldset ítens de coleta */}
                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais ítens de coleta</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item => (
                            <li 
                                key={item.id} 
                                onClick={() => handleSelectedItem(item.id)}
                                className={ selectedItems.includes(item.id) ? 'selected' : '' }
                            >
                                {/* Para onClick com parâmetro é necessário utilizar esta sintaxe "() => " */}
                                <img src={item.image_url} alt={item.title}/>
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button type="submit">Cadastrar ponto de coleta</button>
            </form>
        </div>
    );
};

export default CreatePoint;