package ca.brij.bean.service;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@NamedQueries({ @NamedQuery(name = "Service.getAllServices", query = "from Service"), 
	@NamedQuery(name = "Service.getServiceById", query = "from Service where id = :id")})
@Table(name = "service")
public class Service implements Serializable {

	private static final long serialVersionUID = -7172335826301797613L;
	
	public Service(){
		
	}
	
	public Service(String serviceName) {
		super();
		this.serviceName = serviceName;
		this.status = "active";
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, unique = true)
	private Integer id;
	
	@Column(name = "serviceName", nullable = false, unique = true)
	private String serviceName;
	
	@Column(name = "status", nullable = false)
	private String status;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	public static List<Service> populateServices(){
		
		List <Service> services = new ArrayList<Service>();
		
		services.add(new Service("Cleaning"));
		services.add(new Service("Dog Walking"));
		services.add(new Service("Gardening"));
		services.add(new Service("Snow Shoveling"));
		services.add(new Service("Tutoring"));
		
		return services;
	}

}
