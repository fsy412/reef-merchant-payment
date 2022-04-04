import { Container, Dropdown, Table, Row, Col } from "react-bootstrap"
import "./index.scss"
const Swap = () => {
    return (
        <Container className="container">
            <div className="SelectionBox" >
                <div className="textBox">
                    <span className="textFrom">
                        From
                    </span>
                    <span className="textBalance">
                        Balance 2.3
                    </span>
                </div>
                <div className="inputBox">
                    <div className="inputWrapper">
                        <input className="inputControl" type="text"></input>
                    </div>
                    <div className="selectWrapper">
                        <Dropdown className="tokenSelect">
                            <Dropdown.Toggle className="dropdownToggle" id="dropdown-basic">
                                Select Token
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdownMenu">
                                <Dropdown.Item className="dropdownItem" href="#/action-1"> <img className="icon" src="https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png"></img> USDC        </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="tokenSelect">
                            <Dropdown.Toggle className="dropdownToggle" id="dropdown-basic">
                                Select Chain
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdownMenu">
                                <Dropdown.Item className="dropdownItem" href="#/action-1"> <img className="icon" src="https://anyswap.exchange/static/media/ETH.cec4ef9a.svg"></img> Ethereum        </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div>
                <button className="createButton">Create Order</button>
            </div>
            <div>
                <Table striped bordered hover variant="">
                    <thead className="tableHeader">
                        <tr>
                            <th>Coin</th>
                            <th>Amount</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="tableBody">
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td className="buyButtonWrapper" ><button className="buyButton">Buy</button></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </Container>
    )
}
export default Swap