import React, { Component } from 'react';
import AddNewSpotModal from './modal/AddNewSpot';
import axios from 'axios';
import Button from './Button';
import swal from 'sweetalert2';
import Loader from './Loader';
import { FaCheck } from 'react-icons/lib/fa';

class Grid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAddSpotModalOpen: false,
            isLoading: false
        };

        this.onModalStateChange = this.onModalStateChange.bind(this);
        this.onAddNewSpot = this.onAddNewSpot.bind(this);
        this.setLoadingState = this.setLoadingState.bind(this);
    }
    /*
     * @param: state
     * Accepted values: 'open' and 'close'
     */
    onModalStateChange(state) {
        let isModalOpen = state === 'open';
        this.setState({
            isAddSpotModalOpen: isModalOpen
        });
    }
    setLoadingState(loadingState) {
        this.setState({
            isLoading: loadingState
        });
    }
    onAddNewSpot(spot) {
        const spots = this.props.spots;
        const currentUser = this.props.currentUser;
        const newSpot = {
            spotId: spots[spots.length - 1].spotId + 1,
            userId: currentUser.id,
            name: spot.spotName
        };
        spots.push(newSpot);
        axios.put("https://api.myjson.com/bins/t7mlr", spots)
            .then(response => {
                swal(
                    'Sucesso!',
                    'Seu novo local foi adicionado :)',
                    'success'
                );
                this.onModalStateChange('close');
                this.props.loadSpots(this.props.currentUser);
            })
            .catch(err => {
                swal(
                    'Ops...',
                    'Erro ao salvar novo local. Tente novamente mais tarde :(',
                    'error'
                );
                this.onModalStateChange('close');
            });
    }
    render() {
        const columns = ['', 'Id', 'Nome'];
        return (
            <div>
                {this.state.isLoading ? 
                    <Loader />
                    : <div>
                        <div style={this.props.selectedSpots.length ? style.halfButton : style.fullButton}>
                            <Button
                                label={"Adicionar novo local"}
                                onClick={() => this.onModalStateChange('open')}
                            />
                        </div>
                        { this.props.selectedSpots.length ?
                            <div style={style.halfButton}>
                                <Button
                                    label={"Remover locais selecionados"}
                                    onClick={this.props.onRemoveSpots}
                                />
                            </div>
                            : null
                        }
                        { this.props.spots.length ?
                            <table style={style.table}>
                                <thead>
                                    <tr style={style.head}>
                                        {columns.map((column, idx) => <th key={idx}>{column}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                        {this.props.spots.map((spot, index) => {
                                            return (
                                                <tr 
                                                    key={`spot_${index}`}
                                                    style={this.props.selectedSpots.includes(spot) ? style.selectedRow : style.row  }
                                                    onClick={() => this.props.onSelectSpot(spot)} 
                                                >
                                                    <td style={style.checkbox}>
                                                        {this.props.selectedSpots.includes(spot) ?
                                                            <FaCheck />
                                                            : null        
                                                        }
                                                    </td>
                                                    <td>{spot.spotId}</td>
                                                    <td>{spot.name}</td>
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                        : <div style={style.emptyMessageContainer}>
                            <span style={style.emptyMessageText}>
                                Oops, parece que você ainda não possui nenhum local cadastrado. Adicione novos locais clicando acima :)
                            </span>
                        </div>
                        }
                        <AddNewSpotModal 
                            isOpen={this.state.isAddSpotModalOpen}
                            onModalStateChange={this.onModalStateChange}
                            onAddNewSpot={this.onAddNewSpot} 
                        />
                    </div>
                }
            </div>
        );
    }
};

/*
 *
 */
const style = {
    table: {
        width: '98%',
        margin: '8px',
        textAlign: 'center'
    },
    head: {
        fontWeight: 600,
        height: '40px',
        lineHeight: '38px',
        backgroundColor: 'rgba(239, 149, 156, 0.5)',
        border: '1px solid #bf8e8e',
        borderRadius: '20px'
    },
    row: {
        height: '38px',
        lineHeight: '36px',
        borderBottom: '1px solid #bf8e8e'
    },
    selectedRow: {
        height: '38px',
        lineHeight: '36px',
        borderBottom: '1px solid #bf8e8e',
        backgroundColor: 'rgba(142, 142, 142, 0.74)'
    },
    checkbox: {
        width: '55px',
        color: '#3EFF3B'
    },
    fullButton: {
        width: '96%',
        padding: '10px 0',
        marginLeft: '2%'
    },
    halfButton: {
        width: '48%',
        padding: '10px 0',
        display: 'inline-block',
        marginRight: '1%'
    },
    emptyMessageContainer: {
        width: '100%',
        height: '75vh',
        textAlign: 'center',
        display: 'table'
    },
    emptyMessageText: {
        display: 'table-cell',
        verticalAlign: 'middle',
        fontSize: '1.4em',
        padding: '40px'
    }
}

export default Grid;