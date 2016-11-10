package ca.brij.bean.user;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.maps.model.LatLng;

import ca.brij.utils.ConstantsUtil;

import ca.brij.utils.ConstantsUtil;

@Entity
@NamedQueries({ 
		@NamedQuery(name = "User.getAll", query = "FROM User"),
		@NamedQuery(name = "User.getCountAll", query = "SELECT COUNT(*) FROM User"),
		@NamedQuery(name = "User.findByUserName", query = "FROM User WHERE username = :username"),
		@NamedQuery(name = "User.findByEmail", query = "FROM User WHERE email = :email"),
		@NamedQuery(name = "User.findUserByResetID", query = "FROM User WHERE resetID = :resetID"),
		@NamedQuery(name = "User.findByUserLike", query = "FROM User WHERE LOWER(username) LIKE LOWER('%' || :username || '%' )"),
		@NamedQuery(name = "User.countUserLike", query = "SELECT COUNT(*) FROM User WHERE LOWER(username) LIKE LOWER('%' || :username || '%' )"),
		@NamedQuery(name = "User.findUser", query = "FROM User WHERE username = :username AND password = :password")
})
@Table(name = "users")
public class User implements Serializable {

	private static final long serialVersionUID = -1401790070620926402L;

	@Id
	@Column(name = "username", nullable = false, unique = true)
	private String username;
	
	@Column(name = "password", nullable = false, length = 100)
	private String password;
	
	@Column(name = "email", nullable = false, unique = true)
	private String email;

	@JsonIgnore
	@Column(name = "enabled")
	private Boolean enabled;

	@Column(name = "firstName", length = 100)
	private String firstName;
	
	@Column(name = "lastName", length = 100)
	private String lastName;
	
	@Column(name = "phoneNumber", length = 100)
	private String phoneNumber;
	
	@Column(name = "address", length = 100)
	private String address;

	@Column(name = "city", length = 100)
	private String city;
	
	@Column(name = "province", length = 100)
	private String province;
	
	@Column(name = "latitude")
	private Double latitude;
	
	@Column(name = "longitude")
	private Double longitude;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "resetID")
	private String resetID;
	
	public String getResetID() {
		return resetID;
	}

	public void setResetID(String resetID) {
		this.resetID = resetID;
	}

	@JsonIgnore
	@OneToMany(fetch = FetchType.EAGER, mappedBy = "user" , cascade = CascadeType.ALL, orphanRemoval=true)
	private Set<UserRole> userRole = new HashSet<UserRole>(0);

	// Public methods
	public User() {
	}

	public User(String username) {
		this.username = username;
		this.email = username;
		this.password="";
	}

	public User(String username, String password) {
		this.email = username;
		this.username = username;
		this.password = password;
		this.enabled = true;
	}
	
	public User(String username, String password, String email) {
		this.email = email;
		this.username = username;
		this.password = password;
		this.enabled = true;
	}
	
	public User(String username, String password, String email, Boolean enabled) {
		this.email = email;
		this.username = username;
		this.password = password;
		this.enabled = enabled;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String name) {
		this.username = name;
	}
	@JsonIgnore
	public String getPassword() {
		return password;
	}
	@JsonProperty
	public void setPassword(String password) {
		this.password = password;
	}
	
	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	//isEnabled would be the convention
	//But as it is, it needs to be get to be
	// recognized as a getter by the beanutils.
	@JsonIgnore
	public Boolean getEnabled() {
		return enabled;
	}
	@JsonIgnore
	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	@JsonIgnore
	public Set<UserRole> getUserRole() {
		return userRole;
	}
	@JsonIgnore
	public void setUserRole(Set<UserRole> userRole) {
		this.userRole = userRole;
	}
	
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	public static List<User> getPriviligedUser(){
		List<User> users = new ArrayList<User>();
		String encryptedPassword = new BCryptPasswordEncoder().encode("admin");
		User admin = new User("Admin", encryptedPassword, "Admin", true);
		UserRole adminRole = new UserRole(admin, "ROLE_ADMIN");
		UserRole userRole = new UserRole(admin, "ROLE_USER");
		admin.setStatus(ConstantsUtil.ACTIVE);
		admin.getUserRole().add(userRole);
		admin.getUserRole().add(adminRole);
		users.add(admin);
		return users;
	}


	
	
}
