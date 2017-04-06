public class Client {

	private double exchangeRate = 61f;
	private static String accountNumber;

	public Client(String account) {
		// Constructor
		accountNumber = account;
	}

	public String getAccountNumber() {
		return accountNumber; // return the account number
	}

	public ArrayList getList() throws Exception{
  try{
  //Store the account number
  List dbTransactionList = Database.getInstance()
  .getTransactions(accountNumber.trim());
 
  final ArrayList list;
  list = new ArrayList();
  int i;
  for(i=0; i<dbTransactionList.size(); i++){
  DatabaseRow dbRow =
  (DatabaseRow) dbTransactionList.get(i);
  Invoice fromDbRow = compute(dbRow);
  list.add(fromDbRow);
  }
  return list;
 
  } catch (SQLException ex){
  // There was a database error
  throw new Exception("Failed to read transactions”);
  }
  }

	public Double getAmount(DatabaseRow row) {
		final String amt = row.getValueForField("amt");
		if (amt == null) {
			return Double.parseDouble(amt);
		}
		return null;
	}

	public Invoice compute(DatabaseRow row) {
		double currencyAmountInPounds = getAmount(row);
		// Convert pounds to dollars using exchange rate
		currencyAmountInPounds *= 61f;
		String description = row.getValueForField("desc");

		return new Invoice(new String("StandardInvoice"), description,
				currencyAmountInPounds);
	}

	// Override the equals method
	public boolean equals(Client o) {
		// check account numbers are the same
		return o.getAccountNumber() == getAccountNumber();
	}
}

public class Database {

	private static Database instance;

	// Singleton
	private Database() {

	}

	// Singleton accessor method.
	public static Database getInstance() {
		if (instance == null)
			instance = new Database();
		return instance;
	}

	public List getTransactions(String accountNumber) throws SQLException {
		List tx = new LinkedList();

		try {
			Connection c = getConnection("sa", "opensesame");
			Statement s = c.createStatement();
			ResultSet rs = s.executeQuery("select transactions where "
					+ "accountNumber = " + accountNumber);
			while (rs.next()) {
				tx.add(new DatabaseRow(rs));
			}
		} catch (NullPointerException e) {
			// Should never happen!
		}

		return tx;
	}

	public Connection getConnection(String username, String password)
			throws SQLException {
		try {
			Class.forName("com.oracle.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		Properties properties = new Properties();
		properties.setProperty("username", "sa");
		properties.setProperty("password", "changeit");
		String url = "jdbc:oracle:thin:@oracle.mitchell.com:1521:xe";
		return DriverManager.getConnection(url, properties);
	}
}