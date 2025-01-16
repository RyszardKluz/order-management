import { Table } from 'react-bootstrap';
import Checkbox from '../Checkbox';

const ResourceListTable = ({
  columnHeadings,
  resourceList,
  resourceId,
  hasCheckButton,
  handleRowClick,
  keyList,
}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          {columnHeadings.map((heading, index) => (
            <th key={index}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {resourceList.map((resource, index) => (
          <tr
            key={resource[resourceId]}
            onClick={
              hasCheckButton ? undefined : () => handleRowClick(resource)
            }
          >
            <td>{index + 1}</td>
            {keyList.map((key) => (
              <td key={resource[key]}>{resource[key]}</td>
            ))}

            {hasCheckButton ? (
              <td>
                <Checkbox handleClick={handleRowClick} />
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ResourceListTable;
