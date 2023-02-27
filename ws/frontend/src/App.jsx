import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [selectedMenu, setSelectedMenu] = useState("")
  const [daftar, setDaftar] = useState([]);
  const [pesanan, setPesanan] = useState([])
  useEffect(() => {
    document.title = "Pesanan"
    getDaftar()
    getPesanan()
  }, [])
  async function getPesanan() {
    try {
      const res = await fetch("/api/pesanan")
      if(!res.ok) return
      const data = await res.json()
      setPesanan(data)
    }catch(err) {
      console.log(err)
    }
  }
  async function getDaftar() {
    try {
      const res = await fetch("/api/menu")
      if(!res.ok) return
      const data = await res.json()
      if(data.length == 0) return
      setDaftar(data)
      setSelectedMenu(data[0].id)
    }catch(err) {
      console.log(err);
    }
  }
  async function hapusPesanan(id) {
    try {
      const res = await fetch(`/api/pesanan/${id}`, {
        method: "DELETE",
      })
      if(!res.ok) return
      getPesanan()
    }catch(err) {
      console.log(err)
    }
  }
  async function handleSubmit(ev) {
    ev.preventDefault()
    try {
      const data = daftar.findIndex((data) => data.id == selectedMenu )
      console.log(data)
      if(data < 0) return
      const res = await fetch("/api/pesanan", {
        method : "POST",
        headers : { 
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(daftar[data])
      })
      if(!res.ok) return
      alert("Berhasil")
      getPesanan()
    }catch(err) {
      return 
    }
  }

  return (
    <div className="App" >
      <h1>Restoran Ceria</h1>
      <form onSubmit={handleSubmit}>
        
        <label htmlFor="menu-makanan">Menu:</label>
        <select id="menu-makanan" value={selectedMenu} onChange={(ev) => {
          setSelectedMenu(ev.target.value);
        }}>
         {
          daftar.map((item) => {
            return (
              <option key={item.id} value={item.id}>{item.nama}({item.harga.toLocaleString("id-ID", {style : "currency", currency : "IDR"})})</option>
            )
          })
         }
        </select><br /><br />
       
    
    <button>Pesan</button>
  </form>
  <h2>List Pesanan</h2>
  <ul>
    {
      pesanan.map(el => (
        <li key={el.id}>{el.nama} <a style={{color:"red", cursor:"pointer", userSelect:"none"}} onClick={() => {
          hapusPesanan(el.id)
        }}>Hapus</a></li>
      ))
    }
  </ul>
</div>
);
}

export default App;
