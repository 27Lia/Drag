import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import styled from "styled-components";

const Container = styled.div`
  background-color: #000000;
  color: #00ff00;
`;

const Item = styled.div`
  background-color: #202020;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #00ff00;
  border-radius: 10px;
  color:#dfdbdb;

`;

const Button = styled.button`
  background-color: transparent;
  color: #00ff00;
  border: 2px solid #00ff00;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Orbitron", 'IBMPlexMono';

  &:hover {
    background-color: #00ff00;
    color: #000000;
  }
`;

const Input = styled.input`
  background-color: #333;
  color:#dfdbdb;
  border: 1px solid #00ff00;
  padding: 5px 0px;
  margin: 10px 0px;
  width: 100%;
  outline:none;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  margin-bottom:5px;
  
`;
const CRUDComponent = () => {
  const [newItemText, setNewItemText] = useState("");
  const [items, setItems] = useState([]);
  const itemsCollectionRef = collection(db, "items");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleDatabaseInteraction = async (action, id, data) => {
    switch (action) {
      case "add":
        await addDoc(itemsCollectionRef, data);
        break;
      case "update":
        await updateDoc(doc(db, "items", id), data);
        break;
      case "delete":
        await deleteDoc(doc(db, "items", id));
        break;
      default:
        throw new Error("Invalid action");
    }
    fetchItems();
  };

  const fetchItems = async () => {
    const data = await getDocs(itemsCollectionRef);
    setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = () => {
    handleDatabaseInteraction("add", null, { text: newItemText });
    setNewItemText("");
  };

  const updateItem = (id, newText) => {
    handleDatabaseInteraction("update", id, { text: newText });
  };

  const deleteItem = (id) => {
    handleDatabaseInteraction("delete", id);
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditingText(item.text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText("");
  };

  const confirmEditing = () => {
    updateItem(editingId, editingText);
    cancelEditing();
  };

  return (
    <Container>
      <Input
        type="text"
        value={newItemText}
        onChange={(e) => setNewItemText(e.target.value)}
      />
      <BtnBox>
        <Button onClick={addItem}>Add Item</Button>
      </BtnBox>

      {items.map((item) => (
        <Item key={item.id}>
          {editingId === item.id ? (
            <div>
              <Input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
              <BtnBox>
                <Button onClick={confirmEditing}>Confirm</Button>
                <Button onClick={cancelEditing}>Cancel</Button>
              </BtnBox>
            </div>
          ) : (
            <div>
              {item.text}
              <BtnBox>
                <Button onClick={() => startEditing(item)}>Edit</Button>
                <Button onClick={() => deleteItem(item.id)}>Delete</Button>
              </BtnBox>
            </div>
          )}
        </Item>
      ))}
    </Container>
  );
};

export default CRUDComponent;
