package ca.brij.bean.posting;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicUpdate;


@Entity
@NamedQueries({ @NamedQuery(name = "Posting.getAllPostings", query = "from Posting"),
		@NamedQuery(name = "Posting.getPostingById", query = "from Posting where id = :id"),
		@NamedQuery(name = "Posting.getPostingsByUserID", query = "from Posting where userID = :userID") })
@Table(name = "posting", indexes = { @Index(name = "posting_userIdInd", columnList = "userID"),
		@Index(name = "posting_nameInd", columnList = "name") })
@DynamicUpdate
public class Posting {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, unique = true)
	private Integer id;

	@Column(name = "name", nullable = false)
	private String name;

	// get this from the form (dropdown has values);
	@Column(name = "servID", nullable = false)
	private String servID;

	@Column(name = "userID", nullable = false)
	private String userID;

	@Column(name = "price")
	private double price;
	// temp string for now
	@Column(name = "startDate")
	private String startDate;

	@Column(name = "endDate")
	private String endDate;

	@Column(name = "startTime")
	private String startTime;

	@Column(name = "endTime")
	private String endTime;

	@Column(name = "details", columnDefinition = "TEXT")
	private String details;

	public Posting() {
	}

	public Posting(Integer id, String name) {
		this.id = id;
		this.name = name;
	}

	public Posting(Integer id, String name, String userID, String servID) {
		this.id = id;
		this.name = name;
		this.userID = userID;
		this.servID = servID;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getServID() {
		return servID;
	}

	public void setServID(String servID) {
		this.servID = servID;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}
}