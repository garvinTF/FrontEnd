import React, {Component} from 'react';
import $ from 'jquery';
import axios from 'axios';

class Pegawai extends Component {

    constructor() {
        super();
        this.state = {
            pegawai: [], //array siswa untuk menampung data siswa
            nama: "",
            username: "",
            password: "",
        }
    }
	
	bind = (event) => {
		this.setState({[event.target.name]: event.target.value});
	  }
	
	  Add = () => {
		// mengosongkan isi variabel absen, nama, dan kelas
		// set action menjadi "insert"
		this.setState({
		  nama: "",
		  username: "",
		  password: "",
		  action: "insert"
		});
	  }
	
	  Edit = (item) => {
		/*
		- mengisikan isi variabel absen, nama, kelas sesuai dengan data yang
		akan diedit
		- set action menjadi "update"
		*/
		this.setState({
		  nama: item.nama,
		  username: item.username,
		  password: item.password,
		  action: "update"
		});
	  }
	
	  getPegawai = () => {
		let url = "http://localhost:8000/abe";
		// mengakses api untuk mengambil data siswa
		axios.get(url)
		.then(response => {
		  // mengisikan data dari respon API ke array siswa
		  this.setState({pegawai: response.data.siswa});
		})
		.catch(error => {
		  console.log(error);
		});
	  }
	
	  findPegawai = (event) => {
		let url = "http://localhost:8000/abe";
		if (event.keyCode === 13) {
		  // menampung data keyword pencarian
		  let form = {
			find: this.state.search
		  }
		  // mengakses api untuk mengambil data siswa
		  // berdasarkan keyword
		  axios.post(url, form)
		  .then(response => {
			// mengisikan data dari respon API ke array siswa
			this.setState({pegawai: response.data.pegawai});
		  })
		  .catch(error => {
			console.log(error);
		  });
		}
	  }
	
	  SavePegawai = (event) => {
		event.preventDefault();
		/* menampung data absen, nama dan kelas dari Form
		ke dalam FormData() untuk dikirim  */
		let url = "";
		if (this.state.action === "insert") {
		  url = "http://localhost:8000/abe"
		} else {
		  url = "http://localhost:8000/abe/update"
		}
		
		let form = {
		  nama: this.state.nama,
		  username: this.state.username,
		  password: this.state.password
		}
	
		// mengirim data ke API untuk disimpan pada database
		axios.post(url, form)
		.then(response => {
		  // jika proses simpan berhasil, memanggil data yang terbaru
		  this.getPegawai();
		})
		.catch(error => {
		  console.log(error);
		});
		// menutup form modal
		$("#modal").modal('hide');
	  }
	
	  Drop = (nama) => {
		let url = "http://localhost:8000/abe/" + nama;
		// memanggil url API untuk menghapus data pada database
		if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
		  axios.delete(url)
		  .then(response => {
			// jika proses hapus data berhasil, memanggil data yang terbaru
			this.getPegawai();
		  })
		  .catch(error => {
			console.log(error);
		  });
		}
	  }
	
	  componentDidMount(){
		// method yang pertama kali dipanggil pada saat load page
		this.getPegawai()
	  }	

	render(){  
	    return (  
	      <div className="m-3 card">  
	        <div className="card-header bg-info text-white">Data Pegawai</div>  
	        <div className="card-body">  
	        <input type="text" className="form-control mb-2" name="search" value={this.state.search}  
	          onChange={this.bind} onKeyUp={this.findPegawai} placeholder="Pencarian..." />  
	        {/* tampilan tabel siswa */}  
	          <table className="table">  
    	            <thead>  
	              <tr>  
	                <th>Nama</th>  
	                <th>Username</th>  
	                <th>Password</th>  
	                <th>Option</th>  
	              </tr>  
	            </thead>  
	            <tbody>  
	              {this.state.pegawai.map((item,index) => {  
	                return (  
	                  <tr key={index}>  
	                    <td>{item.nama}</td>  
	                    <td>{item.username}</td>  
	                    <td>{item.password}</td>  
	                    <td>  
	                      <button className="btn btn-sm btn-info m-1" data-toggle="modal"  
	                      data-target="#modal" onClick={() => this.Edit(item)}>  
	                        Edit  
	                      </button>  
	                      <button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(item.nama)}>  
	                        Hapus  
	                      </button>  
	                    </td>  
	                  </tr>  
	                );  
	              })}  
	            </tbody>  
	          </table>  
	          <button className="btn btn-success" onClick={this.Add}  
	          data-toggle="modal" data-target="#modal">  
	            Tambah Data  
	          </button>  
	          {/* modal form siswa */}  
	          <div className="modal fade" id="modal">  
	            <div className="modal-dialog">  
	              <div className="modal-content">  
	                <div className="modal-header">  
	                  Form Pegawai  
	                </div>  
	                <form onSubmit={this.SavePegawai}>  
	                  <div className="modal-body">  
	                    Nama
	                    <input type="text" name="nama" value={this.state.nama} onChange={this.bind}  
	                    className="form-control" required />  
	                    Username
	                    <input type="text" name="username" value={this.state.username} onChange={this.bind}  
	                    className="form-control" required />  
	                    Password
	                    <input type="text" name="password" value={this.state.password} onChange={this.bind}  
	                    className="form-control" required />  
	                  </div>  
	                  <div className="modal-footer">  
	                    <button className="btn btn-sm btn-success" type="submit">  
	                    Simpan  
	                    </button>  
	                  </div>  
	                </form>  
	              </div>  
	            </div>  
	          </div>  
	        </div>  
	      </div>  
	    );  
	  }  
}
export default Pegawai;