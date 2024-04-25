import React, { useState } from "react";
import { Modal } from "antd";

export const DescriptionCell = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showFullDescription = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const preview = description.split(" ").slice(0, 3).join(" ") + "...";

  return (
    <div>
      {isExpanded ? description : preview}
      <a onClick={showFullDescription} style={{ marginLeft: 8 }}>
        {isExpanded ? "See Less" : "See More"}
      </a>
      <Modal
        title="Full Description"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <button onClick={handleOk} style={{ marginRight: 8 }}>
            Close
          </button>,
        ]}
      >
        <p>{description}</p>
      </Modal>
    </div>
  );
};
