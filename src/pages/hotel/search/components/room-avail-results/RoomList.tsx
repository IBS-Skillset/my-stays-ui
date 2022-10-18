import { MouseEventHandler, useCallback, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import './RoomList.scss';
import data from "../data.json";
import * as React from "react";

type Data = typeof data;

type SortKeys = keyof Data[0];

type SortOrder = "ascn" | "desc";

function sortData({
    tableData,
    sortKey,
    reverse,
}: {
    tableData: Data;
    sortKey: SortKeys;
    reverse: boolean;
}) {
    if (!sortKey) return tableData;

    const sortedData = data.sort((a, b) => {
        return a[sortKey] > b[sortKey] ? 1 : -1;
    });

    if (reverse) {
        return sortedData.reverse();
    }

    return sortedData;
}

function SortButton({
    sortOrder,
    columnKey,
    sortKey,
    onClick,
}: {
    sortOrder: SortOrder;
    columnKey: SortKeys;
    sortKey: SortKeys;
    onClick: MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <button onClick={onClick}
            className={`${sortKey === columnKey && sortOrder === "desc"
                ? "sort-button sort-reverse"
                : "sort-button"
                }`}
        >
        </button>
    );
}

function RoomList({ data }: { data: Data }) {
    const [sortKey, setSortKey] = useState<SortKeys>("TotalAmount");
    const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const headers: { key: SortKeys; label: string }[] = [
        { key: "RoomTypeCode", label: "RoomType" },
        { key: "TotalAmount", label: "Today's Price" },
        { key: "Amenities", label: "Your Choices" },
    ];

    const sortedData = useCallback(
        () => sortData({ tableData: data, sortKey, reverse: sortOrder === "desc" }),
        [data, sortKey, sortOrder]
    );

    function changeSort(key: SortKeys) {
        setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");

        setSortKey(key);
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Room List
            </Button>
            <Modal className="modal" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Rooms Available!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <div className="container">

                        <div className="row">
                            <table className="rooms">
                                <thead>
                                    <tr>
                                        {headers.map((row) => {
                                            return (
                                                <th key={row.key}>
                                                    {row.label}{" "}
                                                    {/*<SortButton
                                            columnKey={row.key}
                                            onClick={() => changeSort(row.key)}
                                            {...{
                                                sortOrder,
                                                sortKey,
                                            }}
                                        />*/}
                                                </th>
                                            );
                                        })}
                                    </tr>
                                </thead>

                                <tbody>
                                    {sortedData().map((room) => {
                                        return (
                                            <tr key={room.RoomTypeCode}>
                                                <td>{room.RoomTypeCode}</td>
                                                <td>{room.TotalAmount}</td>
                                                <td>
                                                    {room.Amenities}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RoomList;
