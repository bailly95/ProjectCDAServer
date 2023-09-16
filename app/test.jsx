<Backdrop
  style={styles.backdrop}
  revealed={revealed}
  header={
    <CustomAppBar
      currentPage="HomeScreen"
      onMenuPress={() => dispatch(toggleRevealed())}
    />
  }
  headerContainerStyle={styles.headerContainerStyle}
  backLayer={
    <View style={styles.listView}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Accueil");
          dispatch(toggleRevealed());
        }}
      >
        <Text style={styles.listText}>Accueil</Text>
      </TouchableOpacity>
      {/*<TouchableOpacity onPress={() => {*/}
      {/*    navigation.navigate('Favoris');*/}
      {/*    dispatch(toggleRevealed());*/}
      {/*}}>*/}
      {/*    <Text style={styles.listText}>Favoris</Text>*/}
      {/*</TouchableOpacity>*/}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Contact");
          dispatch(toggleRevealed());
        }}
      >
        <Text style={styles.listText}>Contact</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("À Propos");
          dispatch(toggleRevealed());
        }}
      >
        <Text style={styles.listText}>À Propos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Inscription");
          dispatch(toggleRevealed());
        }}
      >
        <Text style={styles.listText}>Inscription</Text>
      </TouchableOpacity>
      {isToken ? (
        <TouchableOpacity
          onPress={() => {
            SecureStore.deleteItemAsync("token").then(
              (r) => dispatch(setIsToken(false)),
              dispatch(toggleRevealed()),
              navigation.navigate("Accueil")
            );
          }}
        >
          <Text style={styles.listText}>Déconnexion</Text>
        </TouchableOpacity>
      ) : null}
      {/* <TouchableOpacity onPress={() => {
                                            navigation.navigate('Mon Compte');
                                            dispatch(toggleRevealed());
                                        }}>
                                            <Text style={styles.listText}>Mon Compte</Text>
                                        </TouchableOpacity>*/}
    </View>
  }
></Backdrop>;
