import { useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Image, View, Text, TouchableOpacity, FlatList, Alert, RefreshControl } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useTransactions } from '../../hooks/useTransactios';
import { useEffect, useState } from 'react';
import PageLoader from '../../components/PageLoader';
import { styles } from '../../assets/styles/home.style';
import image from "../../assets/images/logo.png"
import { SignOutButton } from "../../components/SignOutButton"
import BalanceCard from '../../components/BalanceCard';
import TransactionItem from '../../components/TransactionItem';
import NoTransactionsFound from '../../components/NoTransaction';

export default function Page() {
  const { user } = useUser();
  const { transactions, summary, isLoading, loadData, deleteTransactions } = useTransactions(user.id);
  const router = useRouter()
  const [refreshing, setRefreshing] = useState();

  const onRefreshing = async ()=> {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }


  useEffect(() => {
    loadData();
  }, [loadData])

  if (isLoading && !refreshing) {
    return <PageLoader />
  }

  const handleDelete = (id) => {
    Alert.alert("Delete Transaction", "Sure? want to Delete?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteTransactions(id) }
    ])
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={image}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome: </Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0].emailAddress.split("@")[0]}
              </Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>

        <BalanceCard summary={summary} />

        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>
      </View>
      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transactions}
        renderItem={({ item }) => (
          <TransactionItem item={item} onDelete={handleDelete} />
        )}
        ListEmptyComponent={<NoTransactionsFound />}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshing} />}
      >
      </FlatList>
    </View>
  )
}