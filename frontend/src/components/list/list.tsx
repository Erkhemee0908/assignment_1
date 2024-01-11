import { useEffect, useState } from "react"

export default function List(props: any) {


    const [names, setNames] = useState<Name[]>([])

    const [showList, setShowList] = useState(false)

    const [refreshKey, setRefreshKey] = useState(false);

    //  useEffect hook triggers GET request every time props are updated
    useEffect(() => {
        fetch('http://localhost:8080/names')
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setNames(data)
            })
    }, [props, refreshKey])

    type Name = {
        _id: string;
        name: string;
    }


    // using useState hook to toggle list
    const handleClick = () => {
        setShowList(!showList)
    }
    // removin name from list
    const handleRemove = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:8080/names/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setRefreshKey(!refreshKey);
            } else {
                console.error('Server responded with status:', response.status);
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation: ', error);
        }
    };



    return (
        <section className="list">
            <div
                style={{ cursor: 'pointer', display: 'inline-block', backgroundColor: '#cfcfcf', paddingRight: 20, paddingLeft: 20, paddingTop: 5, paddingBottom: 5 }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#cfcfcf'}
                onClick={handleClick}
            >
                List
            </div>
            {
                showList
                    ?
                    <table data-testid="name-list">
                        <thead>
                            <tr>
                                <th style={{ width: '70%' }}>Name</th>
                                <th style={{ width: '30%' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                // Mapping the data received from database
                                names.map((n) => {
                                    return (
                                        <tr key={n._id}>
                                            <td style={{ width: '70%' }}>{n.name}</td>
                                            <td style={{ width: '30%' }}>
                                                <div
                                                    style={{ cursor: 'pointer', display: 'inline-block' }}
                                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                                                    onClick={() => handleRemove(n._id)}
                                                >
                                                    🗑️
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>




                    :
                    <></>
            }
        </section>
    )
}