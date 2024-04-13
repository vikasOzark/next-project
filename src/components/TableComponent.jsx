const data = [
    {
        firstName: "Tanner",
        lastName: "Linsley",
        age: 33,
        visits: 100,
        progress: 50,
        status: "Married",
    },
    {
        firstName: "Kevin",
        lastName: "Vandy",
        age: 27,
        visits: 200,
        progress: 100,
        status: "Single",
    },
];

const TableComponent = () => {
    const table = useReactTable({ columns, data });
    table.getState().rowSelection; //read the row selection state
    table.setRowSelection((old) => ({ ...old })); //set the row selection state
    table.resetRowSelection(); //reset the row selection state
    return table;
};
